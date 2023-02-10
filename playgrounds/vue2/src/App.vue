<template>
    <component :is="page"/>
</template>
<script setup>
    import { computed, ref } from "vue"
    import { routes } from "./routes.js"

    const currentURL = ref(window.location.pathname)

    const page = computed(() => {
        return routes[currentURL.value]
    })
</script>
