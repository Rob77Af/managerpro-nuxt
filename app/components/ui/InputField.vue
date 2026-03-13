<template>
  <label class="flex flex-col gap-1.5">
    <span class="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-port-light/50">{{ label }}</span>
    <input :type="type || 'text'" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder" class="bg-gray-50 dark:bg-port-dark border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-port-light" />
  </label>
</template>

<script setup lang="ts">
defineProps<{ label: string; modelValue?: string | number; placeholder?: string; type?: string }>()
defineEmits(['update:modelValue'])
</script>
