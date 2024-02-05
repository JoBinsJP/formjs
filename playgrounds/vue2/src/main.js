import Axios from "axios"
import { createPinia, PiniaVuePlugin } from "pinia"
import Vue from "vue"
import App from "./App.vue"
import {client} from "formjs-vue2"

// const axios = Axios.create()
client.axios().interceptors.response.use((response) => {
    return response;
},(err) => {
    return Promise.reject(err);
})

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
    render: (h) => h(App),
    pinia,
}).$mount("#app")
