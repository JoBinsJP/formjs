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
]
