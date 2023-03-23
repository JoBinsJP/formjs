import Axios from "axios"

export class UserService {
    static getUsers(data) {
        return Axios.post("api/users", data)
    }
}
