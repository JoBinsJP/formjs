import vue2 from "@vitejs/plugin-vue2"
import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import { viteMockServe } from "vite-plugin-mock"

export default defineConfig({
    plugins: [
        vue2(),
        viteMockServe({
            mockPath: "api",
            localEnabled: true,
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
})
