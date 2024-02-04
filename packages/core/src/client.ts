import {AxiosInstance, default as Axios} from "axios"
import {Client} from "./types";

/**
 * The configured axios client.
 */
let axiosClient: AxiosInstance = Axios

export const client: Client = {
    use(axios) {
        axiosClient = axios

        return client
    },

    axios() {
        return axiosClient
    }
}
