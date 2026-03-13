<template>
  <div class="space-y-6 h-full flex flex-col">
    <div class="flex items-center gap-4 bg-white dark:bg-port-deep p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 mb-2">
      <div class="bg-orange-100 dark:bg-port-glow/20 p-3 rounded-xl">
        <component :is="activeSubTab === 'freight' ? Truck : ShoppingCart" class="w-8 h-8 text-orange-600 dark:text-port-glow" />
      </div>
      <div>
        <h2 class="text-2xl font-black text-gray-900 dark:text-port-light tracking-tighter uppercase">{{ activeSubTab === 'freight' ? 'Cotacoes de Frete' : 'Cotacoes de Mercadorias' }}</h2>
        <p class="text-xs text-gray-400 dark:text-port-light/40 uppercase tracking-widest font-bold">Mercado de Comercio Exterior</p>
      </div>
    </div>
    <div class="flex-1 min-h-0">
      <FreightQuoteSubTab v-if="activeSubTab === 'freight'" :quotes="freightQuotes" :exporters="exporters"
        @update:quotes="$emit('update:freight-quotes', $event)" @select-freight="$emit('select-freight', $event)" @quick-add="$emit('quick-add', $event)" />
      <MerchandiseQuoteSubTab v-else-if="activeSubTab === 'merchandise'" :quotes="merchandiseQuotes" :products="products" :exporters="exporters"
        @update:quotes="$emit('update:merchandise-quotes', $event)" @quick-add="$emit('quick-add', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Truck, ShoppingCart } from 'lucide-vue-next'
import type { FreightQuote, MerchandiseQuote, Product, Exporter } from '~/types'

defineProps<{ activeSubTab: 'freight' | 'merchandise'; freightQuotes: FreightQuote[]; merchandiseQuotes: MerchandiseQuote[]; products: Product[]; exporters: Exporter[] }>()
defineEmits<{
  'update:freight-quotes': [v: FreightQuote[]]; 'update:merchandise-quotes': [v: MerchandiseQuote[]];
  'select-freight': [price: number]; 'quick-add': [type: string];
}>()
</script>
