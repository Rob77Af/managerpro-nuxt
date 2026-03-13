<template>
  <label class="flex flex-col gap-1.5">
    <span class="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-port-light/50">{{ label }}</span>
    <div class="flex items-center gap-2">
      <input type="color" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="w-10 h-9 rounded-lg border border-gray-200 dark:border-white/10 cursor-pointer bg-white p-0.5" />
      <span class="text-xs font-mono text-gray-600 dark:text-port-light/60">{{ modelValue }}</span>
    </div>
  </label>
</template>

<script setup lang="ts">
defineProps<{ label: string; modelValue?: string }>()
defineEmits(['update:modelValue'])
</script>
