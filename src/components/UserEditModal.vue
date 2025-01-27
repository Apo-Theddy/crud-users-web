<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-96">
      <h2 class="text-xl font-semibold mb-4">Editar Usuario</h2>
      <div class="space-y-4">
        <input v-model="user.name" type="text" placeholder="Nombre"
          class="w-full border border-gray-300 rounded-lg px-3 py-2" />
        <input v-model="user.email" type="email" placeholder="Correo"
          class="w-full border border-gray-300 rounded-lg px-3 py-2" />
        <input v-model="user.age" type="number" placeholder="Edad"
          class="w-full border border-gray-300 rounded-lg px-3 py-2" />
        <div class="flex justify-end space-x-2">
          <button @click="close" class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
            Cancelar
          </button>
          <button @click="save" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update', 'close'])

const close = () => {
  emit('close')
}

const save = () => {
  emit('update', props.user)
  close();
}
</script>
