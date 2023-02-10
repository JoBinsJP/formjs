<template>
    <div>
        <input type="email" v-model="form.email">
        <button type="submit" @click="submit">Submit</button>
    </div>
</template>

<script setup>
    import { useForm } from "~formjs-vue2"
    const form = useForm({
        email: ""
    })

    const submit = () => {
        form.post('api/users')
    }
</script>
