import { defineConfig } from "vitest/config"
import vue from "@vitejs/plugin-vue2"
import {resolve} from "path"

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '~formjs-vue2':  resolve(__dirname, './src'),
            'formjs-core':  resolve(__dirname, '../core/src'),
        },
    },
    test: {
        globals: true,
        environment: "jsdom"
    }
})
