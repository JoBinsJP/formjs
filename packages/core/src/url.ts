export function hrefToUrl(href: string | URL, baseURL: string = window.location.toString()): URL {
    return new URL(href.toString(), baseURL)
}

export function urlWithoutHash(url: URL | Location): URL {
    url = new URL(url.href)
    url.hash = ""
    return url
}
