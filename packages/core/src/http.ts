import { default as Axios } from "axios"
import { VisitOptions } from "./types"
import { hrefToUrl, urlWithoutHash } from "./url"
import { hasFiles } from './files'

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
                Accept: "text/html, application/xhtml+xml",
                "X-Requested-With": "XMLHttpRequest",
            },
        }).then((response) => {

        }).then(() => {
            const errors = this.page.props.errors || {}
            if (Object.keys(errors).length > 0) {

            }
            return onSuccess()
        }).catch((error) => {
            return Promise.reject(error)
        }).then(() => {
            return onFinish()
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

)
}
