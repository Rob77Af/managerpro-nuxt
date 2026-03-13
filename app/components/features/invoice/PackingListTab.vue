<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="font-black text-gray-800 dark:text-port-light uppercase tracking-tight">Packing List</h3>
      <p class="text-xs text-gray-400">{{ invoice.items.length }} itens • {{ totalVolumes }} volumes</p>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-xs">
        <thead>
          <tr class="border-b border-gray-200 dark:border-white/10">
            <th class="text-left pb-2 font-black uppercase tracking-widest text-gray-500 dark:text-port-light/50" v-for="h in ['Produto','Qtd','Peso Liq. (kg)','Peso Bruto (kg)','Volumes','Dimensoes']" :key="h">{{ h }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in invoice.items" :key="item.id" class="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
            <td class="py-2 font-bold text-gray-800 dark:text-port-light">{{ item.description }}</td>
            <td class="py-2 text-gray-600 dark:text-port-light/60">{{ item.quantity }}</td>
            <td class="py-2 text-gray-600 dark:text-port-light/60">{{ (item.netWeightKg * item.quantity).toFixed(2) }}</td>
            <td class="py-2 text-gray-600 dark:text-port-light/60">{{ (item.grossWeightKg * item.quantity).toFixed(2) }}</td>
            <td class="py-2 text-gray-600 dark:text-port-light/60">{{ Math.ceil(item.quantity / (item.pack || 1)) }}</td>
            <td class="py-2 text-gray-600 dark:text-port-light/60">{{ item.length }}x{{ item.width }}x{{ item.height }}cm</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="border-t-2 border-gray-300 dark:border-white/20 font-black">
            <td class="pt-2 text-gray-800 dark:text-port-light">TOTAL</td>
            <td class="pt-2">{{ invoice.items.reduce((s, i) => s + i.quantity, 0) }}</td>
            <td class="pt-2">{{ invoice.items.reduce((s, i) => s + i.netWeightKg * i.quantity, 0).toFixed(2) }}</td>
            <td class="pt-2">{{ invoice.items.reduce((s, i) => s + i.grossWeightKg * i.quantity, 0).toFixed(2) }}</td>
            <td class="pt-2">{{ totalVolumes }}</td>
            <td class="pt-2">-</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Invoice, PackingListEntry, PackingListHeader, Client, Exporter, AppSettings } from '~/types'

const props = defineProps<{
  invoice: Invoice; packingList: PackingListEntry[]; packingListHeader: PackingListHeader;
  clients: Client[]; exporters: Exporter[]; appSettings: AppSettings;
}>()
defineEmits<{ 'update:packing-list': [v: PackingListEntry[]]; 'update:packing-list-header': [v: PackingListHeader] }>()

const totalVolumes = computed(() => props.invoice.items.reduce((s, i) => s + Math.ceil(i.quantity / (i.pack || 1)), 0))
</script>
