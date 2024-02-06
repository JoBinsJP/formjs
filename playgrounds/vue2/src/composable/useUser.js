import { http, useForm } from "formjs-vue2"
import { object, string } from "yup"
import { useUserStore } from "../stores/users.js"

export default function useUser() {
    const userStore = useUserStore()

    const userCreateSchema = object({
        name: string().required().min(10),
        email: string().required().email().min(10),
    })

    const form = useForm({
        name: null,
        email: null,
    }, userCreateSchema)

    const getUsers = () => {
        http.get("/api/users", {}, {
            onSuccess: (response) => {
                userStore.setUsers(response.data.data)
            },
        })
    }

    const getUsersError = () => {
        http.post("/api/errors", {}, {
            onSuccess: (response) => {
                userStore.setUsers(response.data.data)
            },
            onError: (errors) => {
                console.log(errors)
            },
        })
    }

    const getError = () => {
        http.post("/api/error", {}, {
            onSuccess: (response) => {
                userStore.setUsers(response.data.data)
            },
            onError: (errors) => {},
        })
    }

    const invalid = () => {
        form.post("/api/invalid")
    }

    const success = async () => {
        await form.validate()

        if (form.hasErrors) { return}

        form.post("/api/users")
    }

    return {
        form,
        invalid,
        success,
        getUsers,
        getUsersError,
        getError,
    }
}
