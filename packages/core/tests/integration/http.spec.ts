import { AxiosResponse, default as Axios } from "axios"
import { MockedRequest } from "msw"
import { afterAll, afterEach, beforeAll, expect, it } from "vitest"
import { http } from "~formjs-core"
import { Errors } from "../../src"
import { server, waitForRequest } from "../mocks/server"

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it("it calls success and finish method in success", () => {
    http.post("api/users", {}, {
        onSuccess: (response: AxiosResponse) => {
            expect(response.data.email).toEqual("admin@admin.test")
        },
        onError: () => {
            expect(false).toBe(true)
        },
        onFinish: () => {},
    })
})

it("it calls errors and finish method in success", () => {
    http.post("api/errors", {}, {
        onError: (errors: Errors) => {
            expect(Object.keys(errors)).toStrictEqual(["email", "name"])
        },
        onFinish: () => {},
    })
})

it("can config the axios default", async () => {
    const pendingRequest = waitForRequest("post", "https://api.example.com/api/users")

    Axios.defaults.baseURL = "https://api.example.com"
    Axios.defaults.headers.common["Authorization"] = `Bearer token`

    http.post("api/users")

    const request = (await pendingRequest) as MockedRequest
    expect(request.url.href).toBe("https://api.example.com/api/users")
    expect(request.headers.get('Authorization')).toBe("Bearer token")
})
