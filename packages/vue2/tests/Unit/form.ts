import { it } from "vitest"

it("it correctly initializes the default data", () => {
    const form = useForm({
        email: "admin@test.com",
    })

    expect(form.data().email).toStrictEqual("admin@test.com")
})
