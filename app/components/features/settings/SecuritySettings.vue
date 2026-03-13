<template>
  <div class="bg-white dark:bg-port-deep rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-white/5 space-y-6">
    <h3 class="font-black text-gray-900 dark:text-port-light uppercase tracking-tight">Seguranca & IA</h3>
    <div class="flex flex-col gap-1.5">
      <label class="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-port-light/50">Nova Senha de Acesso</label>
      <input type="password" v-model="newPassword" placeholder="Nova senha..." class="bg-gray-50 dark:bg-port-dark border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm" />
    </div>
    <div class="p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl">
      <p class="text-xs font-bold text-blue-700 dark:text-blue-300">A chave de API do Eduardo AI (GEMINI_API_KEY) e configurada no arquivo .env do servidor.</p>
    </div>
    <button @click="save" class="bg-port-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs">Salvar</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AppSettings } from '~/types'

const props = defineProps<{ settings: AppSettings }>()
const emit = defineEmits<{ 'update:settings': [v: AppSettings] }>()
const newPassword = ref('')
const save = () => { if (newPassword.value) emit('update:settings', { ...props.settings, password: newPassword.value }) }
</script>
