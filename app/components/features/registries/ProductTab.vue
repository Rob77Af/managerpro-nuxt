<template>
  <div class="space-y-4">
    <div class="flex gap-3">
      <input v-model="search" placeholder="Buscar produtos..." class="flex-1 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 bg-white dark:bg-port-deep dark:text-port-light text-sm font-medium outline-none" />
      <button @click="showForm = true" class="bg-port-primary text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2"><Plus :size="14" /> Novo</button>
    </div>

    <div class="bg-white dark:bg-port-deep rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-xl">
      <div v-if="filteredProducts.length === 0" class="text-center py-16 text-gray-400 dark:text-port-light/30">
        <Package :size="48" class="mx-auto mb-4 opacity-30" />
        <p class="font-bold uppercase tracking-widest text-sm">Nenhum produto cadastrado</p>
        <p class="text-xs mt-1">Clique em "Novo" para adicionar</p>
      </div>
      <table v-else class="w-full text-sm">
        <thead class="bg-gray-50 dark:bg-port-dark/40 text-[10px] uppercase tracking-widest text-gray-500 dark:text-port-light/50 font-black">
          <tr>
            <th class="text-left px-4 py-3">Produto</th>
            <th class="text-left px-4 py-3">NCM</th>
            <th class="text-right px-4 py-3">Preco USD</th>
            <th class="text-right px-4 py-3">Peso (kg)</th>
            <th class="text-center px-4 py-3">Acoes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in filteredProducts" :key="p.id" class="border-t border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            <td class="px-4 py-3"><p class="font-bold text-gray-900 dark:text-port-light truncate max-w-[200px]">{{ p.description }}</p><p class="text-[10px] text-gray-400">{{ p.supplierName }}</p></td>
            <td class="px-4 py-3 text-gray-600 dark:text-port-light/60 font-mono text-xs">{{ p.ncm }}</td>
            <td class="px-4 py-3 text-right font-bold text-gray-800 dark:text-port-light">${{ p.unitPriceUSD.toFixed(2) }}</td>
            <td class="px-4 py-3 text-right text-gray-600 dark:text-port-light/60">{{ p.netWeightKg }} kg</td>
            <td class="px-4 py-3 text-center">
              <div class="flex gap-2 justify-center">
                <button @click="editProduct(p)" class="p-1.5 text-gray-400 hover:text-port-primary rounded-lg transition-colors"><Edit :size="14" /></button>
                <button @click="deleteProduct(p.id)" class="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors"><Trash2 :size="14" /></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showForm" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="showForm = false">
      <div class="bg-white dark:bg-port-deep w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-lg font-black text-gray-900 dark:text-port-light uppercase tracking-tight">{{ editingId ? 'Editar Produto' : 'Novo Produto' }}</h3>
          <button @click="showForm = false" class="text-gray-400 hover:text-gray-600"><X :size="20" /></button>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Descricao" v-model="form.description" class="md:col-span-2" />
          <InputField label="NCM" v-model="form.ncm" />
          <InputField label="Pais de Origem" v-model="form.originCountry" />
          <InputField label="Fornecedor" v-model="form.supplierName" />
          <InputField label="Preco Unitario (USD)" v-model.number="form.unitPriceUSD" type="number" />
          <InputField label="Peso Liq. (kg)" v-model.number="form.netWeightKg" type="number" />
          <InputField label="Peso Bruto (kg)" v-model.number="form.grossWeightKg" type="number" />
          <InputField label="II (%)" v-model.number="form.iiRate" type="number" />
          <InputField label="IPI (%)" v-model.number="form.ipiRate" type="number" />
          <InputField label="PIS (%)" v-model.number="form.pisRate" type="number" />
          <InputField label="COFINS (%)" v-model.number="form.cofinsRate" type="number" />
          <InputField label="MOQ" v-model.number="form.moq" type="number" />
        </div>
        <div class="p-4 border-t border-gray-100 dark:border-white/10 flex justify-end gap-2">
          <button @click="showForm = false" class="px-4 py-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-gray-700">Cancelar</button>
          <button @click="saveProduct" class="px-6 py-2 bg-port-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-port-primary-dark">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, Package, Edit, Trash2, X } from 'lucide-vue-next'
import type { Product, Exporter } from '~/types'

const props = defineProps<{ products: Product[]; exporters: Exporter[]; isFromProcess: boolean }>()
const emit = defineEmits<{ 'update:products': [v: Product[]]; 'update:exporters': [v: Exporter[]]; 'return': [id?: string] }>()

const search = ref('')
const showForm = ref(false)
const editingId = ref<string | null>(null)

const blankForm = (): Partial<Product> => ({
  description: '', ncm: '', originCountry: 'China', supplierName: '', supplierRef: '',
  unitPriceUSD: 0, netWeightKg: 0, grossWeightKg: 0,
  iiRate: 14, ipiRate: 0, pisRate: 2.1, cofinsRate: 9.65, moq: 1, pack: 1,
  length: 0, width: 0, height: 0, material: '', certifications: '', imageUrl: '',
  leadTime: '', marketingDescription: '', detailedDescription: '', code: '', contact: '',
})

const form = ref<Partial<Product>>(blankForm())

const filteredProducts = computed(() =>
  props.products.filter(p =>
    p.description.toLowerCase().includes(search.value.toLowerCase()) ||
    p.ncm.includes(search.value) ||
    p.supplierName.toLowerCase().includes(search.value.toLowerCase())
  )
)

const editProduct = (p: Product) => { editingId.value = p.id; form.value = { ...p }; showForm.value = true }
const deleteProduct = (id: string) => emit('update:products', props.products.filter(p => p.id !== id))
const saveProduct = () => {
  if (editingId.value) {
    emit('update:products', props.products.map(p => p.id === editingId.value ? { ...p, ...form.value } as Product : p))
  } else {
    const newProd: Product = { ...blankForm(), ...form.value, id: crypto.randomUUID() } as Product
    emit('update:products', [...props.products, newProd])
    if (props.isFromProcess) emit('return', newProd.id)
  }
  showForm.value = false; editingId.value = null; form.value = blankForm()
}
</script>
