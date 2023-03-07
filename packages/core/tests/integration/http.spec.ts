import { AxiosResponse, default as Axios } from "axios"
import { MockedRequest } from "msw"
import { afterAll, afterEach, beforeAll, expect, it } from "vitest"
import { Errors, http } from "../../src"
import { server, waitForRequest } from "../mocks/server"
import { UserService } from "../mocks/userService"

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it("it calls success and finish method in success", () => new Promise<void>(done => {
    let errors = false
    let success = false
    let error = false
    http.post("api/users", {}, {
        onSuccess: (response: AxiosResponse) => {
            expect(response.data.email).toEqual("admin@admin.test")
            success = true
        },
        onErrors: () => {
            errors = true
        },
        onError: () => {
            error = true
        },
        onFinish: () => {
            expect(success).toBe(true)
            expect(errors).toBe(false)
            expect(error).toBe(false)
            done()
        },
    })
}))

it("it calls errors and finish method in validation errors", () => new Promise<void>(done => {
    let errors = false
    let error = false
    let success = false
    http.post("api/errors", {}, {
        onSuccess: (response) => success = true,
        onErrors: (_errors: Errors) => {
            expect(Object.keys(_errors)).toStrictEqual(["email", "name"])
            errors = true
        },
        onError: () => {
            error = true
        },
        onFinish: () => {
            expect(success).toBe(false)
            expect(errors).toBe(true)
            expect(error).toBe(false)
            done()
        },
    })
}))

it("can config the axios default", async () => {
    const pendingRequest = waitForRequest("post", "https://api.example.com/api/users")

    Axios.defaults.baseURL = "https://api.example.com"
    Axios.defaults.headers.common["Authorization"] = `Bearer token`

    http.post("api/users")

    const request = (await pendingRequest) as MockedRequest
    expect(request.url.href).toBe("https://api.example.com/api/users")
    expect(request.headers.get("Authorization")).toBe("Bearer token")
})

it("custom axios instance can be configured", async () => {
    const pendingRequest = waitForRequest("post", "https://custom-config.com/api/users")

    const instance = Axios.create({
        baseURL: "https://custom-config.com",
        headers: {
            Authorization: `Bearer token`,
        },
    })

    http.post("/api/users", {}, {
        instance: instance,
    })

    const request = (await pendingRequest) as MockedRequest
    expect(request.url.href).toBe("https://custom-config.com/api/users")
    expect(request.headers.get("Authorization")).toBe("Bearer token")
})

it("can call custom service as ", () => new Promise<void>(done => {
    http.call(UserService.getUsers, {}, {
        onSuccess: (response) => {
            done()
        },
    })
}))
