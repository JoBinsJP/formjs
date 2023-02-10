import useForm from './useForm'

declare module "formjs-core" {
    export interface http {
        form: typeof useForm
    }
}
