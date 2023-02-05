import useForm from './useForm'

declare module "formjs-core" {
    export interface Http {
        form: typeof useForm
    }
}
