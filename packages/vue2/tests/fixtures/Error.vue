<template>
    <div>
        <input type="email" v-model="form.email">
        <span v-if="form.errors.email" v-text="form.errors.email"/>
        <button type="submit" @click="submit">Submit</button>
    </div>
</template>

<script setup>
    import { useForm } from "~formjs-vue2"
    const form = useForm({
        email: ""
    })

    const submit = () => {
        form.post('api/errors')
    }
</script>
