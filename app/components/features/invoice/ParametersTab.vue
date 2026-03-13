<template>
  <div class="space-y-6">
    <h3 class="font-black text-gray-800 dark:text-port-light uppercase tracking-tight">Parametros Globais de Importacao</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="param in paramFields" :key="param.key" class="flex flex-col gap-1.5">
        <label class="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-port-light/50">{{ param.label }}</label>
        <input v-if="param.type === 'number'" type="number" v-model.number="localParams[param.key as keyof typeof localParams]"
          class="bg-gray-50 dark:bg-port-dark border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-port-light" />
        <select v-else v-model="localParams[param.key as keyof typeof localParams]"
          class="bg-gray-50 dark:bg-port-dark border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-port-light">
          <option v-for="opt in param.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
        </select>
      </div>
    </div>
    <button @click="save" class="bg-port-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs">Salvar Parametros</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { GlobalParameters } from '~/types'

const props = defineProps<{ params: GlobalParameters }>()
const emit = defineEmits<{ 'update:params': [v: GlobalParameters] }>()

const localParams = reactive({ ...props.params })

const paramFields = [
  { key: 'usdRate', label: 'Cambio USD/BRL', type: 'number' },
  { key: 'estimatedFreightUSD', label: 'Frete 20\' (USD)', type: 'number' },
  { key: 'estimatedFreight40USD', label: 'Frete 40\' (USD)', type: 'number' },
  { key: 'lclRateUSDPerCBM', label: 'LCL por CBM (USD)', type: 'number' },
  { key: 'airFreightUSDPerKg', label: 'Aereo por kg (USD)', type: 'number' },
  { key: 'insuranceUSD', label: 'Seguro (USD)', type: 'number' },
  { key: 'siscomex', label: 'SISCOMEX (BRL)', type: 'number' },
  { key: 'afrmm', label: 'AFRMM (BRL)', type: 'number' },
  { key: 'brokerFee', label: 'Honorarios Desp. (BRL)', type: 'number' },
  { key: 'thc', label: 'THC (BRL)', type: 'number' },
  { key: 'localFreight', label: 'Frete Local (BRL)', type: 'number' },
  { key: 'icmsRate', label: 'ICMS (%)', type: 'number' },
  { key: 'importModal', label: 'Modal', type: 'select', options: [{ value: 'sea', label: 'Maritimo' }, { value: 'air', label: 'Aereo' }] },
  { key: 'freightType', label: 'Tipo Frete', type: 'select', options: [{ value: 'prepaid', label: 'Prepaid' }, { value: 'collect', label: 'Collect' }] },
]

const save = () => emit('update:params', { ...localParams } as GlobalParameters)
</script>
