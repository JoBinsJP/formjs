import { afterAll, afterEach, beforeAll, expect, it } from "vitest"
import { object, string } from "yup"
import { useForm } from "~formjs-vue2"
import { server } from "../mocks/server"

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

it("error method calls on validation Error", () => new Promise<void>(done => {
    const form = useForm({
        email: null,
        name: null,
    })

    form.post("/api/errors", {
        onError: () => {
            expect(form.errors.email).toBe("The email is a required item.")
            expect(form.errors.name).toBe("The name is a required Item.")

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
    }, userSchema)

    await form.validate("email")

    expect(form.errors.email).toBe("email must be a valid email")
})
