<template>
  <div class="space-y-6">
    <!-- Process Header -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <label class="flex flex-col gap-1 md:col-span-2">
        <span class="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-port-light/50">Exportador</span>
        <select v-model="localInvoice.exporterId" class="border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-port-dark dark:text-port-light outline-none">
          <option value="">Selecione...</option>
          <option v-for="e in exporters" :key="e.id" :value="e.id">{{ e.name }}</option>
        </select>
      </label>
      <label class="flex flex-col gap-1 md:col-span-2">
        <span class="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-port-light/50">Importador (Cliente)</span>
        <select v-model="localInvoice.clientId" class="border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-port-dark dark:text-port-light outline-none">
          <option value="">Selecione...</option>
          <option v-for="c in clients" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>
      </label>
    </div>

    <!-- Items List -->
    <div class="bg-gray-50 dark:bg-port-dark/30 rounded-2xl p-4 space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="font-black text-gray-800 dark:text-port-light uppercase tracking-tight text-sm">Itens do Processo</h3>
        <button @click="addItemMode = true" class="bg-port-primary text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1"><Plus :size="12" /> Adicionar Produto</button>
      </div>
      <div v-if="localInvoice.items.length === 0" class="text-center py-8 text-gray-400 dark:text-port-light/30">
        <Package :size="32" class="mx-auto mb-2 opacity-30" />
        <p class="text-xs font-bold uppercase">Nenhum produto adicionado</p>
      </div>
      <div v-for="(item, i) in localInvoice.items" :key="item.id" class="flex items-center justify-between bg-white dark:bg-port-deep p-3 rounded-xl border border-gray-100 dark:border-white/5">
        <div>
          <p class="font-bold text-gray-900 dark:text-port-light text-sm">{{ item.description }}</p>
          <p class="text-[10px] text-gray-400">NCM: {{ item.ncm }} - {{ item.originCountry }}</p>
        </div>
        <div class="flex items-center gap-3">
          <input type="number" v-model.number="localInvoice.items[i].quantity" min="1" @change="updateTotal(i)" class="w-16 border border-gray-200 dark:border-white/10 rounded-lg px-2 py-1 text-xs text-center dark:bg-port-dark dark:text-port-light" />
          <span class="font-bold text-gray-700 dark:text-port-light text-sm">${{ (item.unitPriceUSD * item.quantity).toFixed(2) }}</span>
          <button @click="removeItem(i)" class="text-gray-400 hover:text-red-500"><X :size="14" /></button>
        </div>
      </div>
    </div>

    <!-- Cost Summary -->
    <div v-if="costs" class="bg-white dark:bg-port-deep p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-xl">
      <h3 class="font-black uppercase tracking-tight text-gray-800 dark:text-port-light mb-4 text-sm">Simulacao de Custos</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <CostCard label="FOB Total" :value="`$${costs.fobTotalUSD.toFixed(2)}`" />
        <CostCard label="CIF (BRL)" :value="`R$ ${costs.cifValueBRL.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`" />
        <CostCard label="Impostos" :value="`R$ ${costs.totalTaxes.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`" />
        <CostCard label="Fator de Importacao" :value="costs.factor.toFixed(4)" />
      </div>
    </div>

    <div class="flex gap-3 justify-end">
      <button @click="saveInvoice" class="bg-port-primary text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2"><Save :size="14" /> Salvar Processo</button>
    </div>

    <!-- Add Item Modal -->
    <div v-if="addItemMode" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="addItemMode = false">
      <div class="bg-white dark:bg-port-deep w-full max-w-lg rounded-2xl shadow-2xl border dark:border-white/10">
        <div class="p-6 border-b dark:border-white/10 flex items-center justify-between">
          <h3 class="text-lg font-black dark:text-port-light uppercase">Adicionar Produto</h3>
          <button @click="addItemMode = false"><X :size="20" class="text-gray-400" /></button>
        </div>
        <div class="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          <button v-for="p in products" :key="p.id" @click="addItem(p)" class="w-full text-left p-3 bg-gray-50 dark:bg-port-dark/40 rounded-xl border border-gray-100 dark:border-white/5 hover:border-port-primary/30 transition-all">
            <p class="font-bold text-gray-900 dark:text-port-light text-sm">{{ p.description }}</p>
            <p class="text-[10px] text-gray-400">{{ p.ncm }} - ${{ p.unitPriceUSD }}</p>
          </button>
          <div v-if="!products.length" class="text-center py-8 text-gray-400">
            <p class="text-sm">Nenhum produto cadastrado.</p>
            <button @click="$emit('quick-add', 'products'); addItemMode = false" class="mt-2 text-port-primary text-xs font-bold underline">Cadastrar agora</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Plus, Package, X, Save } from 'lucide-vue-next'
import type { Invoice, GlobalParameters, Product, Client, Exporter, AppSettings } from '~/types'

const props = defineProps<{
  invoice: Invoice; params: GlobalParameters; products: Product[];
  clients: Client[]; exporters: Exporter[]; appSettings: AppSettings;
}>()
const emit = defineEmits<{ 'update:invoice': [v: Invoice]; 'update:params': [v: GlobalParameters]; 'quick-add': [type: string] }>()

const localInvoice = ref<Invoice>({ ...props.invoice, items: [...props.invoice.items] })
const addItemMode = ref(false)

watch(() => props.invoice, (v) => { localInvoice.value = { ...v, items: [...v.items] } }, { deep: true })

const costs = computed(() => {
  if (!localInvoice.value.items.length) return null
  const p = props.params
  const fobTotalUSD = localInvoice.value.items.reduce((s, i) => s + i.unitPriceUSD * i.quantity, 0)
  const freightUSD = p.importModal === 'sea' ? p.estimatedFreightUSD : p.airFreightUSDPerKg
  const cifUSD = fobTotalUSD + freightUSD + p.insuranceUSD
  const cifValueBRL = cifUSD * p.usdRate
  const iiValue = cifValueBRL * ((localInvoice.value.items[0]?.iiRate || 14) / 100)
  const ipiBase = cifValueBRL + iiValue
  const ipiValue = ipiBase * ((localInvoice.value.items[0]?.ipiRate || 0) / 100)
  const pisValue = cifValueBRL * 0.021
  const cofinsValue = cifValueBRL * 0.0965
  const icmsBase = (cifValueBRL + iiValue + ipiValue + pisValue + cofinsValue + p.storage + p.siscomex + p.afrmm + p.brokerFee + p.thc + p.documentIssueFee + p.scannerInspectionFee + p.otherExpenses + p.localFreight) / (1 - p.icmsRate / 100)
  const icmsValue = icmsBase * (p.icmsRate / 100)
  const totalTaxes = iiValue + ipiValue + pisValue + cofinsValue + icmsValue
  const totalExpenses = p.storage + p.siscomex + p.afrmm + p.brokerFee + p.thc + p.documentIssueFee + p.scannerInspectionFee + p.otherExpenses + p.localFreight
  const totalImportCost = cifValueBRL + totalTaxes + totalExpenses
  const factor = fobTotalUSD > 0 ? totalImportCost / (fobTotalUSD * p.usdRate) : 0
  return { fobTotalUSD, freightUSD, cifValueBRL, iiValue, ipiValue, pisValue, cofinsValue, icmsValue, totalTaxes, totalExpenses, totalImportCost, factor }
})

const addItem = (p: Product) => { localInvoice.value.items = [...localInvoice.value.items, { ...p, quantity: 1, totalUSD: p.unitPriceUSD }]; addItemMode.value = false; emit('update:invoice', { ...localInvoice.value }) }
const removeItem = (i: number) => { localInvoice.value.items = localInvoice.value.items.filter((_, idx) => idx !== i); emit('update:invoice', { ...localInvoice.value }) }
const updateTotal = (i: number) => { localInvoice.value.items[i].totalUSD = localInvoice.value.items[i].unitPriceUSD * localInvoice.value.items[i].quantity; emit('update:invoice', { ...localInvoice.value }) }
const saveInvoice = () => emit('update:invoice', { ...localInvoice.value })
</script>
