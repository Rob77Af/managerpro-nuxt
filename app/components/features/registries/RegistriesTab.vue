<template>
  <div class="space-y-6 h-full flex flex-col">
    <div class="flex items-center gap-4 bg-white dark:bg-port-deep p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 mb-2">
      <div class="bg-port-primary-lightest dark:bg-port-hull/20 p-3 rounded-xl">
        <Database class="w-8 h-8 text-port-primary dark:text-port-hull" />
      </div>
      <div>
        <h2 class="text-2xl font-black text-gray-900 dark:text-port-light tracking-tighter uppercase">
          {{ tabTitles[activeSubTab] || 'Cadastros' }}
        </h2>
        <p class="text-xs text-gray-400 dark:text-port-light/40 uppercase tracking-widest font-bold">Gerenciamento de Ativos e Dados Mestres</p>
      </div>
    </div>
    <div class="flex-1 min-h-0">
      <ProductTab v-if="activeSubTab === 'products'" :products="products" :exporters="exporters" :is-from-process="isFromProcess"
        @update:products="$emit('update:products', $event)" @update:exporters="$emit('update:exporters', $event)"
        @return="(id) => $emit('return', { id, type: 'products' })" />
      <ClientTab v-else-if="activeSubTab === 'clients'" :clients="clients" :is-from-process="isFromProcess"
        @update:clients="$emit('update:clients', $event)" @return="(id) => $emit('return', { id, type: 'clients' })" />
      <ExporterTab v-else-if="activeSubTab === 'exporters'" :exporters="exporters" :is-from-process="isFromProcess"
        @update:exporters="$emit('update:exporters', $event)" @return="(id) => $emit('return', { id, type: 'exporters' })" />
      <OtherSuppliersTab v-else-if="activeSubTab === 'others'" :suppliers="otherSuppliers" @update:suppliers="$emit('update:other-suppliers', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Database } from 'lucide-vue-next'
import type { Product, Client, Exporter, OtherSupplier } from '~/types'

defineProps<{ activeSubTab: string; products: Product[]; clients: Client[]; exporters: Exporter[]; otherSuppliers: OtherSupplier[]; isFromProcess: boolean }>()
defineEmits<{
  'update:products': [v: Product[]]; 'update:clients': [v: Client[]];
  'update:exporters': [v: Exporter[]]; 'update:other-suppliers': [v: OtherSupplier[]];
  'return': [payload?: { id: string; type: string }];
}>()

const tabTitles: Record<string, string> = {
  products: 'Catalogo de Produtos', clients: 'Base de Clientes',
  exporters: 'Fornecedores Globais', others: 'Ecossistema Comex',
}
</script>
