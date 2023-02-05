import useForm from './useForm'

declare module "formjs-core" {
    // export interface Http {
    //     form: typeof useForm
    // }
}

declare module 'vue/types/vue' {
    export interface Vue {}
}
