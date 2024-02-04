import { AxiosResponse } from "axios"
import { hasFiles } from "./files"
import { objectToFormData } from "./formData"
import { Errors, RequestPayload, ResponseOption, VisitOptions } from "./types"
import { hrefToUrl, urlWithoutHash } from "./url"
import {client} from "./client";

export class Http {
    public visit(
        href: string | URL,
        {
            method = "get",
            data = {},
            headers = {},
            forceFormData = false,
            onFinish = () => {},
            onSuccess = () => {},
            onErrors = () => {},
            onError = () => {},
            instance = client.axios(),
        }: VisitOptions = {},
    ): void {
        if ((hasFiles(data) || forceFormData) && !(data instanceof FormData)) {
            data = objectToFormData(data)
        }

        const defaultConfig = instance?.defaults
        let url = typeof href === "string" ? hrefToUrl(href, defaultConfig?.baseURL) : href

        const _url = urlWithoutHash(url).href

        const response = instance(_url, {
            ...defaultConfig,
            method,
            data: method === "get" ? {} : data,
            params: method === "get" ? data : {},
            headers: {
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-Formjs": true,
                ...headers,
            },
        })

        this.handleResponse(response, {
            onSuccess: onSuccess,
            onErrors: onErrors,
            onError: onError,
            onFinish: onFinish,
        })
    }

    public get(
        url: URL | string,
        data: RequestPayload = {},
        options: Exclude<VisitOptions, "method" | "data"> = {},
    ): void {
        return this.visit(url, { ...options, method: "get", data })
    }

    public post(
        url: URL | string,
        data: RequestPayload = {},
        options: Exclude<VisitOptions, "method" | "data"> = {},
    ): void {
        return this.visit(url, { ...options, method: "post", data })
    }

    public put(
        url: URL | string,
        data: RequestPayload = {},
        options: Exclude<VisitOptions, "method" | "data"> = {},
    ): void {
        return this.visit(url, { ...options, method: "put", data })
    }

    public delete(url: URL | string, options: Exclude<VisitOptions, "method"> = {}): void {
        return this.visit(url, { ...options, method: "delete" })
    }

    public call(callback: (data: any) => Promise<AxiosResponse<any, any>>, data: RequestPayload = {}, options: ResponseOption={}): void {
        const response = callback(data)

        this.handleResponse(response, options)
    }

    private handleResponse(
        axios: Promise<AxiosResponse<any, any>>,
        {
            onSuccess = () => {},
            onErrors = () => {},
            onError = () => {},
            onFinish = () => {},
        }: ResponseOption,
    ) {
        axios.then((response) => {
            return onSuccess(response)
        }).catch((error) => {
            if (error.response?.status === 422) {
                const errors: Errors = {}
                const responseErrors = error.response.data?.errors || {}
                if (Object.keys(responseErrors).length > 0) {
                    Object.keys(responseErrors).forEach((name) => {
                        errors[name] = responseErrors[name][0]
                    })
                    return onErrors(errors)
                }
            }
            return onError(error)
        }).then(() => {
            return onFinish()
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
}
