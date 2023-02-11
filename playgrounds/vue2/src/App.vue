<template>
    <div class="container mx-auto py-8">
        <component :is="page"/>
    </div>
</template>
<script setup>
    import { computed, ref } from "vue"
    import { routes } from "./routes.js"

    const currentURL = ref(window.location.pathname)

    const page = computed(() => {
        return routes[currentURL.value]
    })
</script>

<style>
    @import "./app.css";
</style>
