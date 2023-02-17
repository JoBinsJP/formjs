<template>
    <div>
        <input type="email"
               v-model="form.email"
               @input="form.validate('email')">

        <span v-text="form.errors"/>

        <button type="submit" @click="submit">Submit</button>
    </div>
</template>

<script setup>
    import { useForm } from "~formjs-vue2"
    const form = useForm({
        email: "",
    })

    const submit = () => {
        form.post("api/errors", {
            onFinish: () => {
                console.log("finish")
            },
        })
    }
</script>
