import {default as Axios} from "axios"
import {afterAll, afterEach, beforeAll, expect, it} from "vitest"
import {object, string} from "yup"
import {useForm} from "../../src"
import {server} from "../mocks/server"
import {UserService} from "../mocks/userService"

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it("it correctly initializes the default data", () => {
    const form = useForm({
        email: "admin@test.com",
    })

    expect(form.data().email).toStrictEqual("admin@test.com")
})

it("transform method correctly transform the form data", () => {
    const form = useForm({
        email: "admin@test.com",
    })

    const data = form.transform((data) => ({
        ...data,
        email: "edit@test.com",
        remember: false,
    })).data()
})

it("onErrors callback is called on validation Error", () => new Promise<void>(done => {
    const form = useForm({
        email: null,
        name: null,
    })

    let success = false
    let errors = false
    let error = false

    form.post("/api/errors", {
        onSuccess: (response) => {
            success = true
        },
        onErrors: (_errors) => {
            expect(form.errors.email).toBe("The email is a required item.")
            expect(form.errors.name).toBe("The name is a required Item.")
            errors = true
        },
        onError: (_error) => {
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

it("onError callback is called on 404 not found", () => new Promise<void>(done => {
    const form = useForm({
        email: null,
        name: null,
    })

    let success = false
    let errors = false
    let error = false

    form.post("/api/404-not-found", {
        onSuccess: (response) => {
            success = true
        },
        onErrors: (_errors) => {
            errors = true
        },
        onError: (_error) => {
            error = true
        },
        onFinish: () => {
            expect(success).toBe(false)
            expect(errors).toBe(false)
            expect(error).toBe(true)
            done()
        },
    })
}))

it("form with custom axios instance", () => new Promise<void>(done => {
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

it("finish method calls on error", () => new Promise<void>(done => {
    const form = useForm({
        email: null,
        name: null,
    })

    form.post("/api/errors", {
        onFinish: () => {
            done()
        },
    })
}))

it("validates form with schema", async () => {
    const userSchema = object({
        email: string().email(),
    })

    const form = useForm({
        email: "admi",
    }, {schema: userSchema})

    await form.validate("email")

    expect(form.errors.email).toBe("email must be a valid email")
})

it("form sends data with validation schema", () => new Promise<void>(done => {
    const userSchema = object({
        email: string().email(),
    })

    const form = useForm({
        email: "admi",
    }, {schema: userSchema})

    form.post("/api/users", {
        onSuccess: () => {
            done()
        },
    })
}))

it("can call custom service as ", () => new Promise<void>(done => {
    const form = useForm({
        email: "admi",
    })

    form.call(UserService.getUsers, {
        onSuccess: (response) => {
            done()
        },
    })
}))

it("call method can set validation", () => new Promise<void>(done => {
    const form = useForm({
        email: "admi",
    })

    form.call(UserService.getErrors, {
        onFinish: () => {
            expect(form.errors.email).toBe("The email is a required item.")
            done()
        }
    })
}))
