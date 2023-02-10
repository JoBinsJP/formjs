<template>
    <form @submit.prevent="submit">
        <div>
            <label for="email">Email:</label>
            <input id="email" v-model="form.email"/>
            <span v-text="form.errors.email"></span>
        </div>

        <label for="first_name">First name:</label>
        <input id="first_name" v-model="form.first_name"/>
        <span v-text="form.errors.first_name"></span>

        <label for="last_name">Last name:</label>
        <input id="last_name" v-model="form.last_name"/>
        <span v-text="form.errors.last_name"></span>

        <input type="file" @input="form.avatar = $event.target.files[0]" />

        <button type="submit">Submit</button>
    </form>
</template>

<script>
    import { useForm } from "formjs-vue2"

    export default {
        data() {
            return {
                form: useForm({
                    first_name: null,
                    last_name: null,
                    email: null,
                }),
            }
        },
        methods: {
            submit() {
                this.form.post("users")
            },
        },
    }
</script>
