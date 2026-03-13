<template>
  <div class="bg-white dark:bg-port-deep rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-white/5 text-center">
    <div class="py-16 text-gray-400 dark:text-port-light/30">
      <Network :size="48" class="mx-auto mb-4 opacity-30" />
      <p class="font-bold uppercase tracking-widest text-sm">Ecossistema Comex</p>
      <p class="text-xs mt-2">Despachantes, agentes de carga, armazens e seguradoras</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Network } from 'lucide-vue-next'
import type { OtherSupplier } from '~/types'
defineProps<{ suppliers: OtherSupplier[] }>()
defineEmits<{ 'update:suppliers': [v: OtherSupplier[]] }>()
</script>
