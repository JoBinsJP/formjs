import { AxiosError, AxiosInstance, AxiosResponse } from "axios"
export type Method = "get" | "post" | "put" | "patch" | "delete"

declare module "axios" {
    export interface AxiosProgressEvent {
        percentage: number | undefined
    }
}

export type FormDataConvertible =
    | Array<FormDataConvertible>
    | Blob
    | FormDataEntryValue
    | Date
    | boolean
    | number
    | null
    | undefined

export type Errors = Record<string, string>
export type RequestPayload = Record<string, FormDataConvertible> | FormData

export type Visit = {
    method: Method
    data: RequestPayload
    headers: Record<string, string>
    forceFormData: boolean,
    instance?: AxiosInstance
}

export type GlobalEventsMap = {
    success: {
        parameters: [AxiosResponse]
        details: {
            response: AxiosResponse
        }
        result: void
    }
    errors: {
        parameters: [Errors]
        details: {
            errors: Errors
        }
        result: void
    }
    error: {
        parameters: [AxiosError]
        details: {
            visit: AxiosError
        }
        result: void
    },
    finish: {
        parameters: []
        details: {}
        result: void
    }
}

export type GlobalEventNames = keyof GlobalEventsMap
export type GlobalEventParameters<TEventName extends GlobalEventNames> = GlobalEventsMap[TEventName]["parameters"]
export type GlobalEventResult<TEventName extends GlobalEventNames> = GlobalEventsMap[TEventName]["result"]

export type GlobalEventCallback<TEventName extends GlobalEventNames> = (
    ...params: GlobalEventParameters<TEventName>
) => GlobalEventResult<TEventName>

export type VisitOptions = Partial<Visit & {
    onFinish: GlobalEventCallback<"finish">
    onSuccess: GlobalEventCallback<"success">
    onErrors: GlobalEventCallback<"errors">
    onError: GlobalEventCallback<"error">
}>

export type ResponseOption = Partial<{
    onFinish: GlobalEventCallback<"finish">
    onSuccess: GlobalEventCallback<"success">
    onErrors: GlobalEventCallback<"errors">
    onError: GlobalEventCallback<"error">
}>
export type HttpResponse = AxiosResponse
export type Instance = AxiosInstance
