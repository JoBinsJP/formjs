import { rest } from "msw"

export const handlers = [
    rest.post("api/users", (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                email: "admin@admin.test",
            }),
        )
    }),

    rest.post("api/errors", (_req, res, ctx) => {
        return res(
            ctx.status(422),
            ctx.json({
                "message": "The team name must be a string. (and 4 more errors)",
                "errors": {
                    "email": [
                        "The team name must be a string.",
                        "The team name must be at least 1 characters.",
                    ],
                    "name": [
                        "The name is a required Item.",
                    ],
                },
            }),
        )
    }),

    rest.post("https://api.example.com/api/users", (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({}),
        )
    }),

    rest.post("https://custom-config.com/api/users", (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({}),
        )
    }),
]
