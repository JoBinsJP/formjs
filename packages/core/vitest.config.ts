import { resolve } from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
    resolve: {
        alias: {
            '~formjs-core':  resolve(__dirname, './src'),
        },
    },
    test: {
        globals: true,
        environment: "jsdom"
    }
})
