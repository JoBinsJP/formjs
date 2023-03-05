import axios from "axios"
import { createPinia, PiniaVuePlugin } from "pinia"
import Vue from "vue"
import App from "./App.vue"

axios.interceptors.response.use(res => {
        return res
    },
    res => {
        throw res
    },
)

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
    render: (h) => h(App),
    pinia,
}).$mount("#app")
