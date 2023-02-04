import { default as Axios } from "axios"
import { hasFiles } from "./files"
import { objectToFormData } from "./formData"
import { RequestPayload, VisitOptions } from "./types"
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
        let url = typeof href === "string" ? hrefToUrl(href) : href

        if ((hasFiles(data) || forceFormData) && !(data instanceof FormData)) {
            data = objectToFormData(data)
        }

        Axios({
            method,
            url: urlWithoutHash(url).href,
            data: method === "get" ? {} : data,
            params: method === "get" ? data : {},
            headers: {
                ...headers,
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
        }).then((response) => {
            const errors = response.data.errors || {}
            if (Object.keys(errors).length > 0) {
                return onError(errors)
            }
            return onSuccess(response.data)
        }).catch((error) => {
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
