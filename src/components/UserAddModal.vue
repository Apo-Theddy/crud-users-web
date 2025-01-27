<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
      <h2 class="text-xl font-semibold mb-4">Agregar Usuario</h2>
      <input v-model="newUser.name" type="text" placeholder="Nombre" required minlength="3"
        class="w-full border border-gray-300 rounded-lg px-3 py-2" />
      <input v-model="newUser.email" type="email" placeholder="Correo" required
        class="w-full border border-gray-300 rounded-lg px-3 py-2" />
      <input v-model="newUser.age" type="number" placeholder="Edad"
        class="w-full border border-gray-300 rounded-lg px-3 py-2" />
      <div class="flex justify-end space-x-2">
        <button @click="close" class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
          Cancelar
        </button>
        <button @click="addUser" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Agregar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';

const emit = defineEmits(['close', 'add']);
const { isOpen } = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const newUser = ref({
  name: '',
  email: '',
  age: 18
});

const addUser = () => {
  if (newUser.value.name === '' || newUser.value.email === '') return;
  emit('add', newUser.value);
  newUser.value = { name: '', email: '', age: 18 };
};

const close = () => {
  emit('close');
};
</script>
