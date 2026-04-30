<script setup lang="ts">
import { process } from 'zod/v4/core';
import AppHeader from '~/components/AppHeader.vue';

</script>

<template>
  <div>
    <AppHeader />
    <UMain>
      <UContainer class="my-8">
        <slot />
      </UContainer>
    </UMain>
    <AppFooter />
  </div>
</template>
