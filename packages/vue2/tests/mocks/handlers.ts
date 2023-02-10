import { rest } from "msw"

export const handlers = [
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
]
