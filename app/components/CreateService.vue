<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

const locations = useLocations()
const categories = useCategories()

const state = reactive({
  email: undefined,
  password: undefined
})

const toast = useToast()
</script>

<template>
  <UForm :state="state" class="space-y-4" @submit="console.log(state)">
    {{ categories.data }}
    {{ locations.data }}
    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>

