<script setup>
const auth = useAuthStore();
auth.init();
</script>

<template>
  <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
  </UApp>
</template>