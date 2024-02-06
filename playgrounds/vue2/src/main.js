import Axios from "axios"
import { createPinia, PiniaVuePlugin } from "pinia"
import Vue from "vue"
import App from "./App.vue"
import {client} from "formjs-vue2"

// const axios = Axios.create()
client.axios().interceptors.response.use((response) => {
    console.log('hello')
    return response;
},(err) => {
    console.log('Intercepter is working fine')
    return Promise.reject(err);
})

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
    render: (h) => h(App),
    pinia,
}).$mount("#app")
