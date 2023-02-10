import { afterAll, afterEach, assert, beforeAll, expect, it } from "vitest"
import { http } from "~formjs-core"
import { server } from "../mocks/server"

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it("it calls success and finish method in success", done => {
    http.post("api/users", {}, {
        onSuccess: (response) => {
            expect(response.data.email).toEqual("admin@admin.test")
        },
        onError: (errors) => {
            expect(false).toBe(true)
        },
        onFinish: () => {},
    })
})

it("it calls errors and finish method in success", done => {
    http.post("api/errors", {}, {
        onError: (errors) => {
            expect(Object.keys(errors)).toStrictEqual(['email','name'])
        },
        onFinish: () => {},
    })
})
