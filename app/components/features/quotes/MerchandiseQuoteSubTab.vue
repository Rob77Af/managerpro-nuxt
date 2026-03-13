<template>
  <div class="space-y-4">
    <div class="flex justify-end"><button @click="showForm = true" class="bg-port-primary text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2"><Plus :size="14" /> Nova Cotacao</button></div>
    <div class="bg-white dark:bg-port-deep rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-xl">
      <div v-if="quotes.length === 0" class="text-center py-16 text-gray-400 dark:text-port-light/30"><ShoppingCart :size="48" class="mx-auto mb-4 opacity-30" /><p class="font-bold uppercase tracking-widest text-sm">Nenhuma cotacao de mercadoria</p></div>
      <table v-else class="w-full text-sm">
        <thead class="bg-gray-50 dark:bg-port-dark/40 text-[10px] uppercase tracking-widest text-gray-500 font-black">
          <tr><th class="text-left px-4 py-3">Cotacao</th><th class="text-left px-4 py-3">Status</th><th class="text-right px-4 py-3">Itens</th><th class="text-center px-4 py-3">Acoes</th></tr>
        </thead>
        <tbody>
          <tr v-for="q in quotes" :key="q.id" class="border-t border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
            <td class="px-4 py-3"><p class="font-bold text-gray-900 dark:text-port-light">#{{ q.id.slice(0, 8) }}</p><p class="text-[10px] text-gray-400">{{ q.date }}</p></td>
            <td class="px-4 py-3"><span :class="['px-2 py-0.5 rounded-full text-[10px] font-black uppercase', q.status === 'approved' ? 'bg-green-100 text-green-700' : q.status === 'quoted' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600']">{{ q.status }}</span></td>
            <td class="px-4 py-3 text-right text-gray-600 dark:text-port-light/60">{{ q.items.length }}</td>
            <td class="px-4 py-3 text-center"><button @click="del(q.id)" class="p-1.5 text-gray-400 hover:text-red-500 rounded-lg"><Trash2 :size="14" /></button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="showForm" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="showForm = false">
      <div class="bg-white dark:bg-port-deep w-full max-w-lg rounded-2xl shadow-2xl border dark:border-white/10">
        <div class="p-6 border-b dark:border-white/10 flex items-center justify-between"><h3 class="text-lg font-black dark:text-port-light uppercase">Nova Cotacao de Mercadoria</h3><button @click="showForm = false"><X :size="20" class="text-gray-400" /></button></div>
        <div class="p-6 space-y-4"><InputField label="Data" v-model="form.date" type="date" /></div>
        <div class="p-4 border-t dark:border-white/10 flex justify-end gap-2"><button @click="showForm = false" class="px-4 py-2 text-xs font-black uppercase text-gray-500">Cancelar</button><button @click="save" class="px-6 py-2 bg-port-primary text-white rounded-xl text-xs font-black uppercase">Salvar</button></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, ShoppingCart, Trash2, X } from 'lucide-vue-next'
import type { MerchandiseQuote, Product, Exporter } from '~/types'

const props = defineProps<{ quotes: MerchandiseQuote[]; products: Product[]; exporters: Exporter[] }>()
const emit = defineEmits<{ 'update:quotes': [v: MerchandiseQuote[]]; 'quick-add': [type: string] }>()
const showForm = ref(false)
const form = ref({ date: new Date().toISOString().split('T')[0], exporterId: '', notes: '' })
const del = (id: string) => emit('update:quotes', props.quotes.filter(q => q.id !== id))
const save = () => { emit('update:quotes', [...props.quotes, { ...form.value, id: crypto.randomUUID(), status: 'pending' as const, items: [] }]); showForm.value = false }
</script>
