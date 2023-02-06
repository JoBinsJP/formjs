import {useForm} from "../../src"
import {expect, it,} from "vitest"

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
