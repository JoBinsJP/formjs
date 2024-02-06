import { rest } from "msw"

export const handlers = [
    rest.post("api/419", (req, res, ctx) => {
        return res(
            ctx.status(419),
        )
    }),

    rest.post("api/users", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                email: "admin@admin.test",
            }),
        )
    }),

    rest.post("api/errors", (req, res, ctx) => {
        return res(
            ctx.status(422),
            ctx.json({
                "message": "The team name must be a string. (and 4 more errors)",
                "errors": {
                    "email": [
                        "The email is a required item.",
                    ],
                    "name": [
                        "The name is a required Item.",
                    ],
                },
            }),
        )
    }),

    rest.post("https://custom-config.com/api/users", (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                { name: "admin", email: "admin@admin.test" },
            ]),
        )
    }),

    rest.post("api/404-not-found", (_req, res, ctx) => {
        return res(
            ctx.status(400)
        )
    }),
]
