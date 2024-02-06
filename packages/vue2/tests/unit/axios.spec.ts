import {afterAll, afterEach, beforeAll, expect, it} from "vitest";
import {default as Axios} from "axios";
import {client} from "formjs-core";
import {useForm} from "../../src";
import {MockedRequest} from "msw";
import { server, waitForRequest } from "../mocks/server"

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it("axios instance can be passed to form's options", () => new Promise<void>(async done => {
    const pendingRequest = waitForRequest("post", "https://custom-config.com/api/users")

    const instance = Axios.create({
        baseURL: "https://custom-config.com",
        headers: {
            Authorization: `Bearer token`,
        },
    })

    const form = useForm({}, {instance: instance})

    form.post('/api/users')

    const request = (await pendingRequest) as MockedRequest
    expect(request.url.href).toBe("https://custom-config.com/api/users")
    done()
}))


it("success callback will be called for form with custom axios instance", () => new Promise<void>(done => {
    const instance = Axios.create({
        baseURL: "https://custom-config.com",
        headers: {
            Authorization: `Bearer token`,
        },
    })

    const form = useForm({
        email: null,
        name: null,
    }, {instance: instance})

    form.post("/api/users", {
        onSuccess: () => {
            done()
        },
    })
}))

it("Global custom axios instance for formjs", () => new Promise<void>(async done => {
    const pendingRequest = waitForRequest("post", "https://custom-config.com/api/users")

    const instance = Axios.create({
        baseURL: "https://custom-config.com",
        headers: {
            Authorization: `Bearer token`,
        },
    })

    client.use(instance)

    const form = useForm({
        email: null,
        name: null,
    })

    form.post('/api/users')

    const request = (await pendingRequest) as MockedRequest
    expect(request.url.href).toBe("https://custom-config.com/api/users")
    done()
}))

it("Global custom axios instance with client.axios", () => new Promise<void>(async done => {
    const pendingRequest = waitForRequest("post", "https://custom-config.com/api/users")

    client.axios().defaults.baseURL = 'https://custom-config.com'

    const form = useForm({
        email: null,
        name: null,
    })

    form.post('/api/users')

    const request = (await pendingRequest) as MockedRequest
    expect(request.url.href).toBe("https://custom-config.com/api/users")
    done()
}))
