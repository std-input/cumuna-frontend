<script setup lang="ts">
const items = ref([{
    'id':1,
    'label':"Santiago de Cuba"
},
{
    'id':2,
    'label':"La Habana"
}])
const value = ref()
</script>

<template>
  <USelectMenu v-model="value" clear clear-icon="i-lucide-trash" icon="i-lucide-map-pinned" :search-input="{placeholder:'Buscar localidad...'}" labelKey="label" placeholder="Selecciona tu localidad" :items="items" />
</template>
