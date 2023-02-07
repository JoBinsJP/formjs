import { rest } from "msw"

export const handlers = [
    rest.post('api/users', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                email:"admin@admin.test"
            })
        )
    }),
]
