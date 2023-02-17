<template>
    <div>
        <div>
            <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                    <h1 class="text-xl font-semibold text-gray-900">Create User</h1>
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <a href="/"
                       class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                        Users
                    </a>
                </div>
            </div>
        </div>
        <div>
            <div class="col-span-6 sm:col-span-3 mb-4">
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input type="text"
                       v-model="form.name"
                       class="mt-2 input"
                       @input="form.validate('name')"
                       @blur="form.validate('name')"/>
                <span v-if="form.errors.name" class="text-red-500" v-text="form.errors.name"/>
            </div>

            <div class="col-span-6 sm:col-span-3 mb-4">
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input type="text"
                       v-model="form.email"
                       @input="form.validate('email')"
                       @blur="form.validate('email')"
                       class="mt-2 input"/>
                <span v-if="form.errors.email" class="text-red-500" v-text="form.errors.email"/>
            </div>

            <div class="flex justify-end">
                <button type="submit"
                        @click="invalid"
                        class="button-danger">Cancel
                </button>
                <button type="submit"
                        :disabled="form.processing"
                        @click="success"
                        class="ml-3 button-primary">Save
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { useForm } from "formjs-vue2"
    import { object, string } from "yup"

    const userCreateSchema = object({
        name: string().required().min(10),
        email: string().required().email().min(10),
    })

    const form = useForm({
        name: null,
        email: null,
    }, userCreateSchema)

    const invalid = () => {
        form.post("/api/errors")
    }

    const success = async () => {
        await form.validate()

        if (form.hasErrors) { return}

        form.post("/api/users")
    }
</script>
