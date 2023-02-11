import axios from "axios"
import Vue from "vue"
import App from "./App.vue"

axios.defaults.baseURL = "https://api.example.com"
axios.interceptors.request.use(
    function(success) {
        console.log("hello")
        return success
    },
    function(error) {
        console.log(error)
        return Promise.reject(error)
    },
)

new Vue({
    render: (h) => h(App),
}).$mount("#app")
