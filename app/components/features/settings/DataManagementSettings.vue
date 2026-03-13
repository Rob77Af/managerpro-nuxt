<template>
  <div class="bg-white dark:bg-port-deep rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-white/5 space-y-6">
    <h3 class="font-black text-gray-900 dark:text-port-light uppercase tracking-tight">Backup & Reset</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button v-for="action in actions" :key="action.key" @click="reset(action.key)"
        :class="['p-4 rounded-xl border text-left transition-all', action.danger ? 'border-red-200 hover:border-red-400 dark:border-red-500/30 dark:hover:border-red-500' : 'border-gray-200 hover:border-port-primary dark:border-white/10']"
      >
        <p :class="['font-black text-sm uppercase tracking-tight', action.danger ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-port-light']">{{ action.label }}</p>
        <p class="text-xs text-gray-400 mt-1">{{ action.description }}</p>
      </button>
    </div>
    <div class="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl">
      <p class="text-xs font-bold text-red-700 dark:text-red-300">Zona de Perigo: operacoes abaixo sao irreversiveis.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AppSettings } from '~/types'

defineProps<{ settings: AppSettings }>()
const emit = defineEmits<{ 'update:settings': [v: AppSettings]; 'reset-data': [options: Record<string, boolean>] }>()

const actions = [
  { key: 'invoices', label: 'Limpar Processos', description: 'Remove todos os processos salvos', danger: false },
  { key: 'products', label: 'Limpar Produtos', description: 'Remove catalogo de produtos', danger: false },
  { key: 'clients', label: 'Limpar Clientes', description: 'Remove base de clientes', danger: false },
  { key: 'all', label: 'Reset Completo', description: 'Apaga TODOS os dados. Irreversivel!', danger: true },
]

const reset = (key: string) => {
  if (confirm(`Confirma o reset de: ${key}? Esta acao nao pode ser desfeita.`)) {
    emit('reset-data', { [key]: true })
  }
}
</script>
