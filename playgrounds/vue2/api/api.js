export default [
    {
        url: "/api/users",
        method: "get",
        response: ({ query }) => {
            return {
                data: [
                    { id: 1, name: "harry", email: "harry@gmail.com" },
                    { id: 2, name: "pyary", email: "pyary@gmail.com" },
                ],
            }
        },
    },

    {
        url: "/api/users",
        method: "post",
        response: ({ query }) => {
            return {
                data: {
                    id: 1,
                    name: "harry",
                    email: "harry@gmail.com",
                },
            }
        },
    },

    {
        url: "/api/errors",
        method: "post",
        statusCode: 422,
        response: ({ query }) => {
            return {
                "message": "The team name must be a string. (and 4 more errors)",
                "errors": {
                    "name": [
                        "The name must be a string.",
                        "The name must be at least 1 characters.",
                    ],
                    "email": [
                        "The email is a required item.",
                    ],
                },
            }
        },
    },
]
