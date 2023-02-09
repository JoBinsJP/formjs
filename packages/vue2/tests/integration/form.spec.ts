import { mount } from "@vue/test-utils"
import { MockedRequest } from "msw"
import { afterAll, afterEach, beforeAll, expect, it } from "vitest"
import { useForm } from "~formjs-vue2"
import Form from "../fixtures/Form.vue"
import { server, waitForRequest } from "../mocks/server"

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

it("it correctly updates data and send request", async () => {
    const pendingRequest = waitForRequest("post", "api/users")

    const wrapper = mount(Form)
    await wrapper.find("input[type=email]").setValue("admin@admin.test")
    await wrapper.get("button").trigger("click")

    const request = await pendingRequest
    expect((request as MockedRequest).body).toEqual({
        email: "admin@admin.test",
    })
})

it("maps validation errors into forms", () => {
    const form = useForm({
        email: "",
    })

    form.post("api/errors", {
        onError: (errors) => {
            expect(Object.keys(errors)).toStrictEqual(["email", "name"])
        },
        onFinish: () => {},
    })

    expect(form.hasErrors).toBe(true)
})
