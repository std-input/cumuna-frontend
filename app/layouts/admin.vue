<script setup lang="ts">
const auth = useAuthStore()
const loading = computed(()=>auth.ready)
</script>


<template>
    <UMain v-if="loading">
        <AdminHeader/>
        <slot />
    </UMain>
    <div v-else>
        Cargando
    </div>
</template>
