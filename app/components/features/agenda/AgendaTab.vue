<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4 bg-white dark:bg-port-deep p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-white/5">
      <div class="bg-yellow-100 dark:bg-port-glow/20 p-3 rounded-xl">
        <CalendarDays class="w-8 h-8 text-yellow-600 dark:text-port-glow" />
      </div>
      <div>
        <h2 class="text-2xl font-black text-gray-900 dark:text-port-light tracking-tighter uppercase">{{ activeSubTab === 'cashflow' ? 'Agenda Financeira' : 'Agenda de Cargas' }}</h2>
        <p class="text-xs text-gray-400 dark:text-port-light/40 uppercase tracking-widest font-bold">Controle de fluxo {{ activeSubTab === 'cashflow' ? 'financeiro' : 'de cargas' }}</p>
      </div>
    </div>
    <div class="bg-white dark:bg-port-deep rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-white/5">
      <div class="grid grid-cols-7 gap-2 mb-4">
        <div v-for="day in ['DOM','SEG','TER','QUA','QUI','SEX','SAB']" :key="day" class="text-center text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-port-light/40 pb-2">{{ day }}</div>
        <div v-for="n in 35" :key="n" class="aspect-square flex items-center justify-center rounded-lg text-xs font-bold hover:bg-port-primary/10 cursor-pointer transition-colors" :class="n === 13 ? 'bg-port-primary text-white' : 'text-gray-600 dark:text-port-light/60'">
          {{ ((n - 1) % 31) + 1 }}
        </div>
      </div>
      <div class="mt-4 space-y-2">
        <p class="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-port-light/40">Proximos eventos</p>
        <div class="text-center py-8 text-gray-300 dark:text-port-light/20">
          <CalendarDays :size="32" class="mx-auto mb-2 opacity-30" />
          <p class="text-xs">Nenhum evento cadastrado</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CalendarDays } from 'lucide-vue-next'
defineProps<{ activeSubTab: 'cashflow' | 'productflow' }>()
</script>
