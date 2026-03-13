<template>
  <div class="space-y-4">
    <div class="flex gap-3">
      <input v-model="search" placeholder="Buscar clientes..." class="flex-1 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 bg-white dark:bg-port-deep dark:text-port-light text-sm outline-none" />
      <button @click="showForm = true" class="bg-port-primary text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2"><Plus :size="14" /> Novo</button>
    </div>
    <div class="bg-white dark:bg-port-deep rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-xl">
      <div v-if="filteredClients.length === 0" class="text-center py-16 text-gray-400 dark:text-port-light/30">
        <Users :size="48" class="mx-auto mb-4 opacity-30" />
        <p class="font-bold uppercase tracking-widest text-sm">Nenhum cliente cadastrado</p>
      </div>
      <table v-else class="w-full text-sm">
        <thead class="bg-gray-50 dark:bg-port-dark/40 text-[10px] uppercase tracking-widest text-gray-500 font-black">
          <tr><th class="text-left px-4 py-3">Cliente</th><th class="text-left px-4 py-3">CNPJ</th><th class="text-left px-4 py-3">Cidade/UF</th><th class="text-center px-4 py-3">Acoes</th></tr>
        </thead>
        <tbody>
          <tr v-for="c in filteredClients" :key="c.id" class="border-t border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
            <td class="px-4 py-3"><p class="font-bold text-gray-900 dark:text-port-light">{{ c.name }}</p><p class="text-[10px] text-gray-400">{{ c.email }}</p></td>
            <td class="px-4 py-3 font-mono text-xs text-gray-600 dark:text-port-light/60">{{ c.document }}</td>
            <td class="px-4 py-3 text-gray-600 dark:text-port-light/60">{{ c.city }} / {{ c.state }}</td>
            <td class="px-4 py-3 text-center">
              <div class="flex gap-2 justify-center">
                <button @click="editClient(c)" class="p-1.5 text-gray-400 hover:text-port-primary rounded-lg"><Edit :size="14" /></button>
                <button @click="deleteClient(c.id)" class="p-1.5 text-gray-400 hover:text-red-500 rounded-lg"><Trash2 :size="14" /></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="showForm" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="showForm = false">
      <div class="bg-white dark:bg-port-deep w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-100 dark:border-white/10 flex items-center justify-between"><h3 class="text-lg font-black text-gray-900 dark:text-port-light uppercase">{{ editingId ? 'Editar Cliente' : 'Novo Cliente' }}</h3><button @click="showForm = false"><X :size="20" class="text-gray-400" /></button></div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Razao Social" v-model="form.name" class="md:col-span-2" />
          <InputField label="CNPJ" v-model="form.document" />
          <InputField label="Contato" v-model="form.contact" />
          <InputField label="E-mail" v-model="form.email" />
          <InputField label="Telefone" v-model="form.phone" />
          <InputField label="Endereco" v-model="form.street" class="md:col-span-2" />
          <InputField label="Cidade" v-model="form.city" />
          <InputField label="Estado (UF)" v-model="form.state" />
          <InputField label="Pais" v-model="form.country" />
          <InputField label="Site" v-model="form.site" />
        </div>
        <div class="p-4 border-t border-gray-100 dark:border-white/10 flex justify-end gap-2"><button @click="showForm = false" class="px-4 py-2 text-xs font-black uppercase text-gray-500">Cancelar</button><button @click="saveClient" class="px-6 py-2 bg-port-primary text-white rounded-xl text-xs font-black uppercase tracking-widest">Salvar</button></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, Users, Edit, Trash2, X } from 'lucide-vue-next'
import type { Client } from '~/types'

const props = defineProps<{ clients: Client[]; isFromProcess: boolean }>()
const emit = defineEmits<{ 'update:clients': [v: Client[]]; 'return': [id?: string] }>()
const search = ref('')
const showForm = ref(false)
const editingId = ref<string | null>(null)
const blank = () => ({ name: '', document: '', contact: '', street: '', city: '', state: '', country: 'Brazil', email: '', phone: '', site: '', mainProducts: '' })
const form = ref<Partial<Client>>(blank())
const filteredClients = computed(() => props.clients.filter(c => c.name.toLowerCase().includes(search.value.toLowerCase()) || c.document.includes(search.value)))
const editClient = (c: Client) => { editingId.value = c.id; form.value = { ...c }; showForm.value = true }
const deleteClient = (id: string) => emit('update:clients', props.clients.filter(c => c.id !== id))
const saveClient = () => {
  if (editingId.value) { emit('update:clients', props.clients.map(c => c.id === editingId.value ? { ...c, ...form.value } as Client : c)) }
  else { const n: Client = { ...blank(), ...form.value, id: crypto.randomUUID() } as Client; emit('update:clients', [...props.clients, n]); if (props.isFromProcess) emit('return', n.id) }
  showForm.value = false; editingId.value = null; form.value = blank()
}
</script>
