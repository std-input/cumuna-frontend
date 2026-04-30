<script setup>
const props = defineProps(['title', 'count'])
</script>

<template>
    <UPageCard spotlight spotlight-color="primary" class="flex-1 metric">  
            <div class="flex flex-col items-center">
                <p class="text-sm">{{ props.title }}</p>
                <p class="font-bold text-primary text-xl">{{props.count}}</p>
            </div>
    </UPageCard>
</template>

<style scoped>
.metric{
    padding: 0px !important;
}
</style>