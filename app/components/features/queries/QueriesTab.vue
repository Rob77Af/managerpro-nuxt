<template>
  <div class="bg-white dark:bg-port-deep rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 h-full flex flex-col overflow-hidden max-w-4xl mx-auto">
    <div class="bg-port-primary p-5 text-white flex items-center gap-3">
      <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
        <User :size="20" />
      </div>
      <div>
        <h2 class="text-lg font-bold">Eduardo AI</h2>
        <p class="text-[10px] uppercase font-bold opacity-80">{{ activeSubTab === 'ncm' ? 'Consultor NCM & Fiscal' : 'Noticias Comex' }}</p>
      </div>
    </div>
    <div ref="chatEl" class="flex-1 overflow-y-auto p-5 space-y-4 bg-port-contrast-light dark:bg-port-dark/30">
      <div v-for="msg in messages" :key="msg.id" :class="['flex', msg.role === 'user' ? 'justify-end' : 'justify-start']">
        <div :class="['max-w-[80%] p-3 rounded-xl text-sm', msg.role === 'user' ? 'bg-port-primary text-white rounded-tr-none' : 'bg-white dark:bg-port-deep text-gray-800 dark:text-port-light border border-gray-200 dark:border-white/10 rounded-tl-none']">
          <p v-for="(line, i) in msg.text.split('\n')" :key="i">{{ line }}</p>
        </div>
      </div>
      <div v-if="isLoading" class="text-xs text-gray-400 italic flex items-center gap-2">
        <Loader2 :size="14" class="animate-spin" /> Eduardo esta pensando...
      </div>
      <div ref="chatEnd" />
    </div>
    <div class="p-4 bg-white dark:bg-port-deep border-t border-gray-100 dark:border-white/5">
      <div class="flex gap-2">
        <input v-model="query" type="text" :placeholder="activeSubTab === 'ncm' ? 'Consultar NCM, impostos...' : 'Pesquisar noticias Comex...'"
          class="flex-1 bg-gray-100 dark:bg-port-dark border-none rounded-xl px-4 py-2 text-sm dark:text-port-light outline-none" @keydown.enter="handleSend" />
        <button @click="handleSend" :disabled="isLoading || !query" class="bg-port-primary disabled:opacity-50 text-white p-2.5 rounded-xl transition-all hover:bg-port-primary-dark">
          <Send :size="18" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import { User, Loader2, Send } from 'lucide-vue-next'
import { consultGemini } from '~/services/geminiService'
import type { Product } from '~/types'

interface ChatMessage { id: string; role: 'user' | 'eduardo'; text: string; timestamp: Date }

const props = defineProps<{ activeSubTab: 'ncm' | 'news' | 'general' }>()
defineEmits<{ 'update:products': [v: Product[]] }>()

const query = ref('')
const isLoading = ref(false)
const chatEnd = ref<HTMLElement | null>(null)
const messages = ref<ChatMessage[]>([])

onMounted(() => {
  messages.value = [{ id: 'welcome', role: 'eduardo', text: 'Ola, sou o Eduardo. Como posso te auxiliar com suas importacoes hoje?', timestamp: new Date() }]
})

watch(messages, async () => { await nextTick(); chatEnd.value?.scrollIntoView({ behavior: 'smooth' }) }, { deep: true })

const handleSend = async () => {
  if (!query.value.trim()) return
  messages.value.push({ id: crypto.randomUUID(), role: 'user', text: query.value, timestamp: new Date() })
  const q = query.value; query.value = ''; isLoading.value = true
  try {
    const response = await consultGemini(q, props.activeSubTab)
    messages.value.push({ id: crypto.randomUUID(), role: 'eduardo', text: response, timestamp: new Date() })
  } catch {
    messages.value.push({ id: crypto.randomUUID(), role: 'eduardo', text: 'Eduardo: Tive um problema na rede. Tente de novo?', timestamp: new Date() })
  } finally { isLoading.value = false }
}
</script>
