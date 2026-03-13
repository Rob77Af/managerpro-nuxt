<template>
  <div class="min-h-screen relative font-sans text-white overflow-hidden bg-slate-950">
    <!-- Cinematic Port Background -->
    <div
      class="fixed inset-0 z-0 bg-cover bg-center animate-subtle-zoom"
      style="background-image: url('https://images.unsplash.com/photo-1559131397-f94da358f7ca?q=80&w=2070&auto=format&fit=crop'); filter: brightness(0.35) blur(3px);"
    />
    <div class="fixed inset-0 z-1 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950" />

    <!-- Navigation Header -->
    <header class="relative z-50 px-6 sm:px-12 h-24 flex items-center justify-between">
      <div class="flex items-center gap-3 group cursor-pointer">
        <div class="bg-port-primary p-2.5 rounded-2xl shadow-[0_0_30px_rgba(76,111,81,0.4)] transition-transform group-hover:scale-110">
          <Ship class="h-6 w-6 text-white" />
        </div>
        <span class="font-black text-2xl tracking-tighter uppercase text-white drop-shadow-lg">ManagerPro</span>
      </div>
      <button
        @click="$emit('enter')"
        class="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95"
      >
        LOGIN
      </button>
    </header>

    <!-- Hero -->
    <main class="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] px-6 text-center">
      <div class="max-w-5xl space-y-8">
        <div class="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-port-primary/10 border border-port-primary/20 text-port-primary-lightest text-[10px] font-black uppercase tracking-[0.3em] mb-4 backdrop-blur-md">
          <span class="flex h-2 w-2 rounded-full bg-port-primary animate-ping"></span>
          Inteligencia Logistica de Ponta
        </div>

        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.85] text-white drop-shadow-2xl">
          PRECISAO NO<br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-port-primary-lighter via-port-primary-lightest to-port-primary">
            COMERCIO EXTERIOR
          </span>
        </h1>

        <p class="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed opacity-90">
          A plataforma inteligente para simulacao de custos, analise de impostos e conformidade aduaneira acelerada por IA.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
          <button
            @click="$emit('enter')"
            class="w-full sm:w-auto px-16 py-6 bg-port-primary text-white rounded-3xl font-black text-xl uppercase tracking-widest hover:bg-port-primary-dark transition-all shadow-[0_25px_60px_rgba(76,111,81,0.4)] hover:-translate-y-1 active:translate-y-0"
          >
            Iniciar Simulacao
          </button>
          <button
            @click="$emit('enter')"
            class="w-full sm:w-auto px-12 py-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl font-black text-xl uppercase tracking-widest hover:bg-white/10 transition-all shadow-2xl"
          >
            Explorar Recursos
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="mt-28 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-7xl">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 text-center group hover:bg-slate-800/60 hover:border-port-primary/30 transition-all shadow-2xl"
        >
          <div class="flex justify-center mb-4">
            <component :is="stat.icon" :size="28" class="text-port-primary group-hover:scale-125 transition-transform duration-500" />
          </div>
          <p class="text-3xl font-black text-white tracking-tighter">{{ stat.val }}</p>
          <p class="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] mt-2">{{ stat.label }}</p>
        </div>
      </div>
    </main>

    <div class="fixed bottom-10 right-12 z-50 hidden lg:flex items-center gap-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] opacity-40">
      Enterprise Edition v2.8.5 <Compass :size="16" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ship, Calculator, Globe, TrendingUp, BrainCircuit, Compass } from 'lucide-vue-next'
import type { AppSettings } from '~/types'

defineProps<{ appSettings: AppSettings }>()
defineEmits<{ enter: [] }>()

const stats = [
  { label: 'Calculos/Dia', val: '2.5k+', icon: Calculator },
  { label: 'Paises Ativos', val: '62+', icon: Globe },
  { label: 'Reducao de Custos', val: '18%', icon: TrendingUp },
  { label: 'NCMs Validados', val: '25k+', icon: BrainCircuit },
]
</script>

<style scoped>
@keyframes subtle-zoom {
  0%, 100% { transform: scale(1.1); }
  50% { transform: scale(1.18); }
}
.animate-subtle-zoom {
  animation: subtle-zoom 60s infinite ease-in-out;
}
</style>
