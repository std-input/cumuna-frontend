<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig();
const url = config.public.BACKEND_URL + '/api/user/' + route.params['id']

const { data, pending, error } = useFetch(url, {
    server: true,
})

const user: ComputedRef<User> = computed(() => data.value?.user as User)
</script>

<template>
    <div>
        <div v-if="pending">
            <h1>Loading...</h1>
        </div>
        <div v-else-if="error">
            <h1>Error: {{ error.statusCode }} - {{ error.statusMessage }}</h1>
        </div>
        <div v-else>
            <div class="flex gap-4">
                <div class="max-w-[400px] min-w-[300px] flex flex-col gap-4 ">
                    <UPageCard spotlight spotlight-color="primary">
                        <img class="rounded-none w-full object-cover" :src="user.picture" />
                        <div>
                            <h1 class="font-bold">{{ user.given_name }}<br>{{ user.family_name }}</h1>
                            <p v-if="user.description">{{ user.description }}</p>
                            <p v-else>Sin descripcion</p>
                        </div>
                    </UPageCard>
                    <div class="flex gap-4">
                        <Metric title="Servicios" count="10"/>
                        <Metric title="Calificaciones" count="19"/>
                    </div>
                </div>
                <div class="flex-1">
                    <CreateService/>
                </div>
            </div>
        </div>
    </div>
</template>