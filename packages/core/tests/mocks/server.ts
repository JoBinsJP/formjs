import { setupServer } from "msw/node"
import { Method } from "../../src"
import { handlers } from "./handlers"

// Setup requests interception using the given handlers.
const server = setupServer(...handlers)

const waitForRequest = (_method: Method, _url: string) => {
    return new Promise((resolve, _reject) => {
        server.events.on("request:match", (req) => {
            resolve(req)
        })
    })
}

export { server, waitForRequest }
