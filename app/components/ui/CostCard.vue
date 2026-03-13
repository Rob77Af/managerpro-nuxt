<template>
  <div class="bg-gray-50 dark:bg-port-dark/50 border border-gray-200 dark:border-white/10 rounded-xl p-4">
    <p class="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-port-light/40">{{ label }}</p>
    <p class="text-lg font-black text-gray-900 dark:text-port-light mt-1">{{ value }}</p>
    <p v-if="sub" class="text-xs text-gray-400 mt-0.5">{{ sub }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: string | number; sub?: string }>()
</script>
