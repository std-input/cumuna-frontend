<script setup lang="ts">
import type { ButtonProps, AuthFormField } from "@nuxt/ui";
import Logo from "~/components/Logo.vue";
import { useAuthStore } from "~/stores/auth";

const toast = useToast();
const config = useRuntimeConfig();

const route = useRoute();
const router = useRouter();
const isCode = ref(false);
const auth = useAuthStore();

async function AuthUser(code: string) {
    toast.add({
        title: "Iniciando sesión",
        description: "Espera un momento mientras se inicia tu sesión...",
    });
    try {
        const data = await $fetch(
            config.public.BACKEND_URL + "/api/auth/code?code=" + code,
            {
                method: "GET",
            },
        );
        const user = {
            ...data.user,
            ...data.tokens,
        };
        return user;
    } catch (error) {
        toast.add({
            title: "Error",
            description:
                "Ocurrió un error al iniciar sesión. Intenta de nuevo.",
        });
        isCode.value = false;
        return null;
    }
}

if (route.query["code"]) {
    auth.logout();
    isCode.value = true;
    if (process.client) {
        watch(
            route,
            (newRoute) => {
                const code = newRoute.query.code as string;
                if (code) {
                    AuthUser(code)
                        .then((user) => {
                            auth.saveUser(user);
                            router.push("/");
                            toast.add({
                                title: "Has iniciado sesion",
                                description:
                                    "Has iniciado sesion exitosamente",
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            toast.add({
                                title: "Error",
                                description:
                                    "Ocurrió un error al iniciar sesión. Intenta de nuevo.",
                            });
                            isCode.value = false;
                        });
                }
            },
            { immediate: true },
        );
    }
}

const providers = ref<ButtonProps[]>([
    {
        label: "Google",
        icon: "i-simple-icons-google",
        color: "neutral",
        variant: "soft",

        onClick: () => {
            toast.add({
                title: "Redireccionando",
                description: "Espera un momento mientras se te redirecciona...",
            });
            setTimeout(() => {
                navigateTo(config.public.BACKEND_URL + "/api/auth", {
                    external: true,
                });
            }, 5000);
        },
    },
]);
/*
const fields = ref<AuthFormField[]>([
  {
    name: 'email',
    type: 'text',
    label: 'Email'
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password'
  }
])
*/
</script>

<template>
    <div
        v-if="!isCode"
        class="flex flex-col items-center justify-center gap-4 p-4"
    >
        <UPageCard class="w-full max-w-md" spotlight spotlight-color="primary">
            <UAuthForm
                title="Iniciar sesion"
                description="Inicia sesion con tu cuenta de Google para acceder a mas funciones."
                icon="i-lucide-user"
                :providers="providers"
                @submit="(e) => console.log(e)"
            />
        </UPageCard>
    </div>
    <UPageCard
        v-else
        icon="i-lucide-loader-2"
        loading
        title="Iniciando sesion"
        description="Espera un momento mientras se inicia sesion, esto sera lo mas rapido posible."
        orientation="horizontal"
        reverse
        spotlight
        spotlight-color="primary"
    >
        <Logo class="w-full" />
    </UPageCard>
</template>
