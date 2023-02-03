export function hrefToUrl(href: string | URL): URL {
    return new URL(href.toString(), window.location.toString())
}

export function urlWithoutHash(url: URL | Location): URL {
    url = new URL(url.href)
    url.hash = ''
    return url
}
