import Vue from "vue"

interface FormProps<TForm> {}

type Form<TForm> = TForm & FormProps<TForm>

export default function useForm<TForm>(): Form<TForm> {
    const form = Vue.observable({
        data() {
            return Object.keys(data).reduce((carry, key) => {
                carry[key] = this[key]
                return carry
            }, {})
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
        submit(method, url, options: VisitOptions = {}) {
            const data = transform(this.data())
        })
    })
}
