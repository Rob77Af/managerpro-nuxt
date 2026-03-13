<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4 bg-white dark:bg-port-deep p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-white/5">
      <div class="bg-port-primary-lightest dark:bg-port-hull/20 p-3 rounded-xl">
        <Calculator class="w-8 h-8 text-port-primary dark:text-port-hull" />
      </div>
      <div>
        <h2 class="text-2xl font-black text-gray-900 dark:text-port-light tracking-tighter uppercase">{{ subTabTitles[activeSubTab] || 'Simulador de Importacao' }}</h2>
        <p class="text-xs text-gray-400 dark:text-port-light/40 uppercase tracking-widest font-bold">Calculos aduaneiros precisos em tempo real</p>
      </div>
    </div>
    <div class="bg-white dark:bg-port-deep rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-white/5">
      <SimulationTab v-if="activeSubTab === 'details'" :invoice="invoice" :params="params"
        :products="products" :clients="clients" :exporters="exporters" :app-settings="appSettings"
        @update:invoice="$emit('update:invoice', $event)" @update:params="$emit('update:params', $event)"
        @quick-add="$emit('quick-add', $event)" />
      <ParametersTab v-else-if="activeSubTab === 'parameters'" :params="params" @update:params="$emit('update:params', $event)" />
      <PackingListTab v-else-if="activeSubTab === 'packing'" :invoice="invoice" :packing-list="packingList"
        :packing-list-header="packingListHeader" :clients="clients" :exporters="exporters" :app-settings="appSettings"
        @update:packing-list="$emit('update:packing-list', $event)" @update:packing-list-header="$emit('update:packing-list-header', $event)" />
      <div v-else-if="activeSubTab === 'list'" class="space-y-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-black text-gray-800 dark:text-port-light uppercase tracking-tight">Processos Salvos</h3>
          <button @click="newInvoice" class="bg-port-primary text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2"><Plus :size="14" /> Novo</button>
        </div>
        <div v-if="savedInvoices.length === 0" class="text-center py-16 text-gray-400 dark:text-port-light/30">
          <Calculator :size="48" class="mx-auto mb-4 opacity-30" />
          <p class="font-bold uppercase tracking-widest text-sm">Nenhum processo salvo</p>
        </div>
        <div v-for="inv in savedInvoices" :key="inv.id"
          class="flex items-center justify-between p-4 bg-gray-50 dark:bg-port-dark/40 rounded-xl border border-gray-200 dark:border-white/5 hover:border-port-primary/30 cursor-pointer transition-all"
          @click="$emit('update:invoice', inv); $emit('navigate', 'details')">
          <div>
            <p class="font-black text-gray-900 dark:text-port-light text-sm">{{ inv.number || 'Sem numero' }} - {{ inv.type || 'Invoice' }}</p>
            <p class="text-xs text-gray-400">{{ inv.date }} - {{ inv.items.length }} itens</p>
          </div>
          <ChevronRight :size="18" class="text-gray-400" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calculator, Plus, ChevronRight } from 'lucide-vue-next'
import type { Invoice, GlobalParameters, Product, Client, Exporter, PackingListEntry, PackingListHeader, AppSettings } from '~/types'

const props = defineProps<{
  activeSubTab: string; invoice: Invoice; savedInvoices: Invoice[]; params: GlobalParameters;
  products: Product[]; clients: Client[]; exporters: Exporter[]; packingList: PackingListEntry[];
  packingListHeader: PackingListHeader; appSettings: AppSettings; newlyAddedId: any;
}>()

const emit = defineEmits<{
  'update:invoice': [v: Invoice]; 'update:saved-invoices': [v: Invoice[]]; 'update:params': [v: GlobalParameters];
  'update:packing-list': [v: PackingListEntry[]]; 'update:packing-list-header': [v: PackingListHeader];
  'update:products': [v: Product[]]; 'update:clients': [v: Client[]]; 'update:exporters': [v: Exporter[]];
  'navigate': [tab: string]; 'quick-add': [type: string]; 'clear-newly-added': [];
}>()

const subTabTitles: Record<string, string> = {
  list: 'Lista de Processos', details: 'Simulacao de Custos',
  parameters: 'Parametros Globais', packing: 'Packing List',
}

const newInvoice = () => {
  emit('update:invoice', { id: crypto.randomUUID(), exporterId: '', clientId: '', date: new Date().toISOString().split('T')[0], number: '', terms: '', items: [], remarks: '' })
  emit('navigate', 'details')
}
</script>
