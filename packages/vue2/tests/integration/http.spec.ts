import {http} from "../../src"
import {server} from "../mocks/server"
import {beforeAll, expect, it} from 'vitest'

beforeAll(() => {
    server.listen()
})

it("it calls success and finish method in success", done => {
    http.post("/api/users", {}, {
        onSuccess: (response) => {
            expect(response.status).toBe(200)
        },
        onFinish: () => {
            expect(true).toBe(true)
            done()
        },
    })
})
