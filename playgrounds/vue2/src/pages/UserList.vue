<template>
    <div>
        {{ users }}
    </div>
</template>

<script setup>
    import { http } from "formjs-vue2"
    import { ref } from "vue"

    const users = ref([])

    http.get("/api/users", {}, {
        onSuccess: (response) => {
            users.value = response.data.data
        },
    })
</script>
