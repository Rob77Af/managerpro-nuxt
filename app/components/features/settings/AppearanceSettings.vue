<template>
  <div class="bg-white dark:bg-port-deep rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-white/5 space-y-6">
    <h3 class="font-black text-gray-900 dark:text-port-light uppercase tracking-tight">Interface & Estilo</h3>
    <div class="flex items-center gap-4">
      <span class="text-sm font-bold text-gray-700 dark:text-port-light">Tema</span>
      <button v-for="t in ['light','dark']" :key="t" @click="localSettings.theme = t as 'light'|'dark'; save()"
        :class="['px-4 py-2 rounded-xl text-xs font-black uppercase transition-all', localSettings.theme === t ? 'bg-port-primary text-white' : 'bg-gray-100 dark:bg-port-dark text-gray-600 dark:text-port-light']">
        {{ t === 'light' ? 'Claro' : 'Escuro' }}
      </button>
    </div>
    <div class="flex flex-col gap-1.5">
      <label class="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-port-light/50">Fonte</label>
      <select v-model="localSettings.customFontFamily" @change="save"
        class="bg-gray-50 dark:bg-port-dark border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm">
        <option v-for="f in fonts" :key="f" :value="f">{{ f }}</option>
      </select>
    </div>
    <button @click="save" class="bg-port-primary text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs">Aplicar</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { AppSettings } from '~/types'

const props = defineProps<{ settings: AppSettings }>()
const emit = defineEmits<{ 'update:settings': [v: AppSettings] }>()
const localSettings = reactive({ ...props.settings })
const fonts = ['Play', 'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Ubuntu']
const save = () => emit('update:settings', { ...localSettings } as AppSettings)
</script>
