<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-96">
      <h2 class="text-xl font-semibold mb-4">Eliminar Usuario</h2>
      <p class="mb-4">¿Estás seguro de que quieres eliminar a {{ user.name }}?</p>
      <div class="flex justify-end space-x-2">
        <button @click="close" class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
          Cancelar
        </button>
        <button @click="confirmDelete" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const { isOpen, user } = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete', 'close'])

const close = () => {
  emit('close')
}

const confirmDelete = () => {
  emit('delete')
}
</script>
