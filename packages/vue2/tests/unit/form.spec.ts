import Axios from "axios"
import { afterAll, afterEach, beforeAll, expect, it } from "vitest"
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
