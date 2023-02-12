import { default as Axios } from "axios"
import { hasFiles } from "./files"
import { objectToFormData } from "./formData"
import { Errors, RequestPayload, VisitOptions } from "./types"
import { hrefToUrl, urlWithoutHash } from "./url"

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
            onError = () => {},
        }: VisitOptions = {},
    ): void {
        const defaultBaseURL = Axios.defaults.baseURL
        const authorizationToken = Axios.defaults.headers.common['Authorization']

        let url = typeof href === "string" ? hrefToUrl(href, defaultBaseURL) : href

        if ((hasFiles(data) || forceFormData) && !(data instanceof FormData)) {
            data = objectToFormData(data)
        }

        Axios({
            method,
            baseURL: defaultBaseURL,
            url: urlWithoutHash(url).href,
            data: method === "get" ? {} : data,
            params: method === "get" ? data : {},
            headers: {
                Accept: "application/json",
                Authorization: authorizationToken,
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                ...headers,
            },
        }).then((response) => {
            return onSuccess(response)
        }).catch((error) => {
            if (error.response?.status === 422) {
                const errors: Errors = {}
                const responseErrors = error.response.data?.errors || {}
                if (Object.keys(responseErrors).length > 0) {
                    Object.keys(responseErrors).forEach((name) => {
                        errors[name] = responseErrors[name][0]
                    })
                    return onError(errors)
                }
            }
            return Promise.reject(error)
        }).then(() => {
            return onFinish()
        }).catch((error) => {
            return Promise.reject(error)
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
}
