<script setup lang="ts">
import SelectLocations from '~/components/SelectLocations.vue';

const auth = useAuthStore()

</script>

<template>
    <h1 class="text-4xl font-serif">Busca servicios cerca de ti</h1>
    <p class="text-md mt-2">Puedes buscar servicios como fotografía, electricidad, costura, clases, servicios de salud o cuidado, entre otros.</p>
    <UInput icon="i-lucide-search" size="xl" class="block w-full mt-4" variant="soft" placeholder="Buscar..." />
    <div class="md:grid grid-cols-2 gap-1 mt-1">
        <SelectLocations class="w-full" variant="soft" size="xl"/>
        <SelectCategories class="w-full mt-1 md:mt-0" variant="soft" size="xl"/>
    </div>
</template>