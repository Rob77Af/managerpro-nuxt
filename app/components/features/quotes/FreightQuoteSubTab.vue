<template>
  <div class="space-y-4">
    <div class="flex justify-end"><button @click="showForm = true" class="bg-port-primary text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2"><Plus :size="14" /> Nova Cotacao</button></div>
    <div class="bg-white dark:bg-port-deep rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-xl">
      <div v-if="quotes.length === 0" class="text-center py-16 text-gray-400 dark:text-port-light/30"><Truck :size="48" class="mx-auto mb-4 opacity-30" /><p class="font-bold uppercase tracking-widest text-sm">Nenhuma cotacao de frete</p></div>
      <table v-else class="w-full text-sm">
        <thead class="bg-gray-50 dark:bg-port-dark/40 text-[10px] uppercase tracking-widest text-gray-500 font-black">
          <tr><th class="text-left px-4 py-3">Rota</th><th class="text-left px-4 py-3">Tipo</th><th class="text-right px-4 py-3">Preco</th><th class="text-left px-4 py-3">Armador</th><th class="text-center px-4 py-3">Acoes</th></tr>
        </thead>
        <tbody>
          <tr v-for="q in quotes" :key="q.id" class="border-t border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
            <td class="px-4 py-3 font-medium text-gray-800 dark:text-port-light">{{ q.origin }} -> {{ q.destination }}</td>
            <td class="px-4 py-3 text-gray-600 dark:text-port-light/60">{{ q.containerType }}</td>
            <td class="px-4 py-3 text-right font-bold text-gray-800 dark:text-port-light">${{ q.priceUSD.toLocaleString() }}</td>
            <td class="px-4 py-3 text-gray-600 dark:text-port-light/60 text-xs">{{ q.carrier }}</td>
            <td class="px-4 py-3 text-center"><div class="flex gap-2 justify-center">
              <button @click="$emit('select-freight', q.priceUSD)" class="px-2 py-1 text-[10px] font-black bg-port-primary/10 text-port-primary rounded-lg uppercase">Usar</button>
              <button @click="del(q.id)" class="p-1.5 text-gray-400 hover:text-red-500 rounded-lg"><Trash2 :size="14" /></button>
            </div></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="showForm" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="showForm = false">
      <div class="bg-white dark:bg-port-deep w-full max-w-lg rounded-2xl shadow-2xl border dark:border-white/10 max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b dark:border-white/10 flex items-center justify-between"><h3 class="text-lg font-black dark:text-port-light uppercase">Nova Cotacao de Frete</h3><button @click="showForm = false"><X :size="20" class="text-gray-400" /></button></div>
        <div class="p-6 grid grid-cols-2 gap-4">
          <InputField label="Origem" v-model="form.origin" />
          <InputField label="Destino" v-model="form.destination" />
          <label class="flex flex-col gap-1.5"><span class="text-[10px] font-black uppercase tracking-widest text-gray-500">Tipo</span><select v-model="form.containerType" class="border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm dark:bg-port-dark dark:text-port-light outline-none"><option>20GP</option><option>40GP</option><option>40HC</option><option>LCL</option></select></label>
          <InputField label="Preco (USD)" v-model.number="form.priceUSD" type="number" />
          <InputField label="Armador" v-model="form.carrier" />
          <InputField label="Free Time (dias)" v-model.number="form.freeTime" type="number" />
          <InputField label="Frequencia" v-model="form.frequency" />
          <InputField label="Valido ate" v-model="form.validUntil" type="date" />
        </div>
        <div class="p-4 border-t dark:border-white/10 flex justify-end gap-2"><button @click="showForm = false" class="px-4 py-2 text-xs font-black uppercase text-gray-500">Cancelar</button><button @click="save" class="px-6 py-2 bg-port-primary text-white rounded-xl text-xs font-black uppercase">Salvar</button></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Truck, Trash2, X } from 'lucide-vue-next'
import type { FreightQuote, Exporter } from '~/types'

const props = defineProps<{ quotes: FreightQuote[]; exporters: Exporter[] }>()
const emit = defineEmits<{ 'update:quotes': [v: FreightQuote[]]; 'select-freight': [price: number]; 'quick-add': [type: string] }>()
const showForm = ref(false)
const blank = () => ({ origin: 'Shanghai, China', destination: 'Santos, Brasil', containerType: '20GP' as const, priceUSD: 0, freeTime: 14, frequency: 'Semanal', carrier: '', validUntil: '', exporterId: '' })
const form = ref(blank())
const del = (id: string) => emit('update:quotes', props.quotes.filter(q => q.id !== id))
const save = () => { emit('update:quotes', [...props.quotes, { ...form.value, id: crypto.randomUUID() }]); showForm.value = false; form.value = blank() }
</script>
