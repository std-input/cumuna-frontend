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
  <USelectMenu v-model="value" clear clear-icon="i-lucide-trash" icon="i-lucide-bookmark" :search-input="{placeholder:'Buscar categoria...'}" labelKey="label" placeholder="Seleccionar una categoria" :items="items" />
</template>
