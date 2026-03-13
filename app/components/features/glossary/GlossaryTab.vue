<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4 bg-white dark:bg-port-deep p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-white/5">
      <div class="bg-blue-100 dark:bg-blue-500/20 p-3 rounded-xl">
        <BookOpen class="w-8 h-8 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <h2 class="text-2xl font-black text-gray-900 dark:text-port-light tracking-tighter uppercase">Dicionario Comex</h2>
        <p class="text-xs text-gray-400 dark:text-port-light/40 uppercase tracking-widest font-bold">Terminologia de Comercio Exterior</p>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="doc in docs" :key="doc.title" class="bg-white dark:bg-port-deep rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-white/5">
        <h3 class="font-black text-gray-900 dark:text-port-light uppercase tracking-tight mb-2">{{ doc.title }}</h3>
        <p class="text-xs text-gray-500 dark:text-port-light/50 leading-relaxed">{{ doc.description }}</p>
      </div>
    </div>
    <div class="bg-white dark:bg-port-deep rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-white/5">
      <h3 class="font-black text-gray-900 dark:text-port-light uppercase tracking-tight mb-4">Busca com Eduardo AI</h3>
      <div class="flex gap-2">
        <input v-model="searchQuery" type="text" placeholder="Buscar termo Comex..." class="flex-1 bg-gray-50 dark:bg-port-dark border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm" @keydown.enter="search" />
        <button @click="search" class="bg-port-primary text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase">Buscar</button>
      </div>
      <div v-if="result" class="mt-4 p-4 bg-gray-50 dark:bg-port-dark rounded-xl text-sm text-gray-700 dark:text-port-light/80">{{ result }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BookOpen } from 'lucide-vue-next'
import { consultGemini } from '~/services/geminiService'

const searchQuery = ref('')
const result = ref('')

const docs = [
  { title: 'Quotation', description: 'Documento inicial de proposta comercial. Nao tem forca legal de contrato mas estabelece condicoes de negociacao.' },
  { title: 'Proforma Invoice', description: 'Fatura proforma usada para abertura de carta de credito e licenca de importacao. Proposta vinculante.' },
  { title: 'Commercial Invoice', description: 'Fatura comercial definitiva. Documento legal da transacao, base para desembaraco aduaneiro.' },
]

const search = async () => {
  if (!searchQuery.value) return
  result.value = 'Consultando Eduardo...'
  result.value = await consultGemini(searchQuery.value, 'ncm')
}
</script>
