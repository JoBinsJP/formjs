import {http} from "../../src"
import {server} from "../mocks/server"
import {beforeAll, expect, assert, it} from 'vitest'

beforeAll(() => {
    server.listen()
})

it("it calls success and finish method in success", done => {
    http.post("api/users", {}, {
        onSuccess: (response) => {
            expect(response.status).toBe(200)
            assert.deepEqual(response.data, {
                email: 'admin@admin.test'
            })
        },
        onFinish: () => {
            expect(true).toBe(true)
        },
    })
})
