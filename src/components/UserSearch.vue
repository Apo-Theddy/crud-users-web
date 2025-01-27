<template>
  <div class="relative m-2">
    <input v-model="searchTerm" type="text" placeholder="Buscar usuarios..."
      class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
    <UserIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { UserIcon } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const searchTerm = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})
</script>
