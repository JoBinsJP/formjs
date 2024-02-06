# formjs
Formjs is a wrapper around axios and Form helper, highly inspired from [InertiaJS](https://inertiajs.com/) for both vue 2 & 3. 
It's a tool to use to handle form and API calls when building client-side application.

# Demo

[![Login Form Demo](https://raw.githubusercontent.com/JoBinsJP/formjs/main/playgrounds/vue2/public/demo.gif)](https://stackblitz.com/edit/vitejs-vite-4vj3mb?file=src/App.vue)


## Installation
```bash
yarn add formjs-vue2
```

> It works for both vue 2 & 3

## Uses

#### API call
It can be used to make an API call.
```vue

<script setup>
    import { http } from "formjs-vue2"

    http.post("api/errors", {}, {
        onSuccess:(response)=>{},
        onErrors: (errors) => {},
        onError: (error) => {},
        onFinish: () => {},
    })
</script>
```


#### Form
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
        email: "",
    })

    form.post("api/users", {}, {
        onSuccess: (response) => {
            // success 
        },
        onErrors: (errors) => {
            // 422 status server validation errors
        },
        onError: (error) => {
            // Other than 422 status errors
        },
        onFinish: () => {
            // The request is completed.
        },
    })
</script>
```


## Validation Errors
It requires to have errors in [Laravel standard](https://laravel.com/docs/9.x/validation#validation-error-response-format) json error format. In which each key has error messages in array 
format. 

```json
{
    "message": "The email field is required. (and 2 more errors)",
    "errors": {
        "email": [
            "The email field is required.",
            "The email must be a valid email address."
        ],
        "name": [
            "The name field is required."
        ],
    }
}
```

## Frontend validations
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
    }, {schema: userStoreSchema})

    const submit = async ()=>{
        // validate all methods 
        await form.validate()
      
        if(!form.hasErrors){
            form.post('/some-endpoints')
        }
    }
</script>

// Somewhere in template
<input v-model="form.email" @input="form.validate('email')"/>
```

## Custom Axios instance
Sometimes it is required to configure custom request.
```js
import {useForm} from "formjs-vue2"
import {default as Axios} from "axios";

const instance = Axios.create({ 
    baseURL: "https://custom-config.com", 
    headers: { 
        Authorization: `Bearer token`, 
    },
})

const form = useForm({
    email: null,
    name: null,
}, { instance: instance })
```

##### With `http`

```js
import {http} from "formjs-vue2"

http.post("api/users", {} , {
    instance: instance,
})
```



## License

The FormJs package is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
