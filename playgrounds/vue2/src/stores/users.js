import { defineStore } from "pinia"
import { reactive, ref } from "vue"
import useUser from "../composable/useUser.js"

export const useUserStore = defineStore("users", () => {
    const users = ref([])

    const setUsers = (data) => {
        users.value = data
    }

    return {
        users,
        setUsers
    }
})
