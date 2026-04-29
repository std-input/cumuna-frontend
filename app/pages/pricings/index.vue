<script setup lang="ts">
import type { PricingPlanProps } from '@nuxt/ui'

const plans = ref<PricingPlanProps[]>([
  {
    title: 'Mensual',
    description: 'Un pago mensual corto. Optimo si no cuentas para los otros planes.',
    price: '$400/mes',
    features: [
      'Publicar servicios',
    ],
    button: {
      label: 'Lo compro'
    }
  },
  {
    title: 'Semestral',
    description: 'Un pago cada 6 meses, que ofrece mas tiempo a menor precio.',
    price: '$350/mes',
    features: [
        'Publicar servicios',
    ],
    button: {
      label: 'Lo necesito'
    }
  },
  {
    title: 'Anual',
    description: 'Un pago anual, por si no quieres preocuparte por un tiempo.',
    price: '$300/mes',
    features: [
    'Publicar servicios',
    ],
    button: {
      label: 'Lo quiero'
    }
  }
])
</script>

<template>
  <UPage>
    <UPageHero headline="Crece junto a nosotros" title="Planes listos, transparentes, sin costos adicionales" description="Desde planes para emprendedores hasta planes a largo plazo. Encuentra el plan que mas se adapte a ti y desbloquea el poder de Cumuna."/>
    <UPageBody>
      <UContainer>
        <UPricingPlans :plans="plans" />
      </UContainer>
    </UPageBody>
  </UPage>
</template>
