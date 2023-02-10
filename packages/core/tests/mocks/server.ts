import { setupServer } from "msw/node"
import { handlers } from "./handlers"

// Setup requests interception using the given handlers.
const server = setupServer(...handlers)

const waitForRequest = (method, url) => {
    return new Promise((resolve, reject) => {
        server.events.on("request:match", (req) => {
            resolve(req)
        })
    })
}

export { server, waitForRequest }
