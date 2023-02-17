# formjs
Formjs is a wrapper around axios and Form helper, highly inspired from [InertiaJS](https://inertiajs.com/). It's a tool to use to handle form and API calls when building client-side application.

### Installation
```bash
yarn add formjs-vue2
```

### Uses
##### API call
It can be used to make an API call.
```vue

<script>
    import { http } from "formjs-vue2"

    http.post("api/errors", {}, {
        onSuccess:(response)=>{},
        onError: (errors) => {},
        onFinish: () => {},
    })
</script>
```
##### Form
```vue
<template>
    <div>
        <input type="email" v-model="form.email">
        <span v-if="form.errors.email" v-text="form.errors.email"/>

        <button type="submit" :disabled="form.processing" @click="submit">Submit</button>
    </div>
</template>
<script setup>
    import { useForm } from "formjs-vue2"

    const form = useForm({
        email: ""
    })
    
    form.post("api/users", {}, {
        onSuccess:(response)=>{},
        onError: (errors) => {},
        onFinish: () => {},
    })
</script>
```
##### Frontend validations
It can be used with yup to validate form.

```vue
<template>
    <div>
        <input type="email" v-model="form.email" @blur="form.validate('email')">
        <span v-if="form.errors.email" v-text="form.errors.email"/>

        <button type="submit" :disabled="form.processing" @click="submit">Submit</button>
    </div>
</template>
<script setup>
    import { useForm } from "formjs-vue2"
    import { object, string } from "yup"

    const userStoreSchema = object({
        email: string().email(),
        firstname: string().min(8),
    })

    const form = useForm({
        email: "",
        firstname: "",
    }, userStoreSchema)
</script>
```

