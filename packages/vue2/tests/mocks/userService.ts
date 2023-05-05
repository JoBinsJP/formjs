import Axios from "axios"

export class UserService {
    static getUsers() {
        return Axios.post("api/users")
    }

    static getErrors() {
        return Axios.post("api/errors")
    }
}
