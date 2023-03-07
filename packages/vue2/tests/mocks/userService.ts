import Axios from "axios"

export class UserService {
    static getUsers() {
        return Axios.post("api/users")
    }
}
