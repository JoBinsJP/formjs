import { http, Method, VisitOptions } from "formjs-core"
import cloneDeep from "lodash.clonedeep"
import isEqual from "lodash.isequal"
import Vue from "vue"
import { ObjectSchema } from "yup"
import debounce from "./debounce"

interface FormProps<TForm> {
    isDirty: boolean
    errors: Record<keyof TForm, string>
    hasErrors: boolean
    processing: boolean

    data(): TForm

    transform(callback: (data: TForm) => object): this

    defaults(): this

    defaults(field: keyof TForm, value: string): this

    defaults(fields: Record<keyof TForm, string>): this

    reset(...fields: (keyof TForm)[]): this

    setError(field: keyof TForm, value: string): this

    setError(errors: Record<keyof TForm, string>): this

    clearErrors(...fields: (keyof TForm)[]): this

    validate(): void

    validate(field: keyof TForm): void

    submit(method: Method, url: string, options?: Partial<VisitOptions>): void

    get(url: string, options?: Partial<VisitOptions>): void

    post(url: string, options?: Partial<VisitOptions>): void

    put(url: string, options?: Partial<VisitOptions>): void

    delete(url: string, options?: Partial<VisitOptions>): void
}

type Form<TForm> = TForm & FormProps<TForm>

export default function useForm<TForm>(data: TForm, schema: ObjectSchema<Record<keyof TForm, string>>): Form<TForm>
export default function useForm<TForm>(...args): Form<TForm> {
    const data = args[0] || {}
    const validationSchema = args[1]
    let defaults = cloneDeep(data)
    let transform = (data) => data

    const form = Vue.observable({
        ...data,
        isDirty: false,
        errors: {},
        hasErrors: false,
        processing: false,
        data() {
            return Object.keys(data).reduce((carry, key) => {
                carry[key] = this[key]
                return carry
            }, {})
        },
        transform(callback) {
            transform = callback

            return this
        },
        defaults(key, value) {
            if (typeof key === "undefined") {
                defaults = this.data()
            } else {
                defaults = Object.assign({}, cloneDeep(defaults), value ? { [key]: value } : key)
            }

            return this
        },
        reset(...fields) {
            let clonedDefaults = cloneDeep(defaults)
            if (fields.length === 0) {
                Object.assign(this, clonedDefaults)
            } else {
                Object.assign(
                    this,
                    Object.keys(clonedDefaults)
                          .filter((key) => fields.includes(key))
                          .reduce((carry, key) => {
                              carry[key] = clonedDefaults[key]
                              return carry
                          }, {}),
                )
            }

            return this
        },
        setError(key, value) {
            Object.assign(this.errors, value ? { [key]: value } : key)

            this.hasErrors = Object.keys(this.errors).length > 0

            return this
        },
        clearErrors(...fields) {
            this.errors = Object.keys(this.errors).reduce(
                (carry, field) => ({
                    ...carry,
                    ...(fields.length > 0 && !fields.includes(field) ? { [field]: this.errors[field] } : {}),
                }),
                {},
            )

            this.hasErrors = Object.keys(this.errors).length > 0

            return this
        },

        async _validateSchema(field) {
            if (!validationSchema) {
                return
            }

            try {
                await validationSchema.validate(this.data(), { abortEarly: false })
                this.clearErrors()
            } catch (error) {
                if (!field) {
                    this.clearErrors()
                    error.inner.forEach((item) => {
                        this.setError(field, item.errors[0])
                    })
                } else {
                    this.clearErrors(field)
                    error.inner.forEach((item) => {
                        if (!field) {
                            this.setError(field, item.errors[0])
                        } else if (field === item.path) {
                            this.setError(field, item.errors[0])
                        }
                    })
                }
            }
        },

        async validate(field) {
            debounce(await this._validateSchema(field), 100)
        },

        submit(method, url, options: VisitOptions = {}) {
            const data = transform(this.data())

            const _options = {
                ...options,
                onSuccess: async (data) => {
                    this.clearErrors()
                    this.processing = false

                    const onSuccess = options.onSuccess ? await options.onSuccess(data) : null
                    defaults = cloneDeep(this.data())
                    this.isDirty = false
                    return onSuccess
                },
                onError: (errors) => {
                    this.processing = false
                    this.clearErrors().setError(errors)

                    if (options.onError) {
                        return options.onError(errors)
                    }
                },
                onFinish: () => {
                    this.processing = false

                    if (options.onFinish) {
                        return options.onFinish()
                    }
                },
            }
            if (method === "delete") {
                http.delete(url, { ..._options, data })
            } else {
                http[method](url, data, _options)
            }
        },
        get(url, options) {
            this.submit("get", url, options)
        },
        post(url, options) {
            this.submit("post", url, options)
        },
        put(url, options) {
            this.submit("put", url, options)
        },
        delete(url, options) {
            this.submit("delete", url, options)
        },
    })

    new Vue({
        created() {
            this.$watch(
                () => form,
                () => {
                    form.isDirty = !isEqual(form.data(), defaults)
                },
                { immediate: true, deep: true },
            )
        },
    })

    return form
}
