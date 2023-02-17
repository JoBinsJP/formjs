import { mount } from "@vue/test-utils"
import { nextTick } from 'vue'
import { MockedRequest } from "msw"
import { afterAll, afterEach, beforeAll, expect, it } from "vitest"
import Error from "../fixtures/Error.vue"
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
