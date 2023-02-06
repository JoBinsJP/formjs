import { rest } from "msw"

export const handlers = [
    rest.post('api/users', (req, res, ctx) => {
        const { username } = req.body

        return res(
            ctx.json({
                email:"admin@admin.test"
            })
        )
    }),
]
