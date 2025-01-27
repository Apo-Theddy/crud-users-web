<template>
  <div class="space-y-4">
    <div class="hidden md:block overflow-x-auto">
      <table class="w-full bg-white shadow-md rounded-lg">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Creación
            </th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50 transition-colors duration-200">
            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.name }}</td>
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ user.age }}</td>
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ formatDate(user.createdAt) }}</td>
            <td class="px-4 py-3 whitespace-nowrap text-sm font-medium">
              <div class="flex space-x-2">
                <button @click="openEditModal(user)"
                  class="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition-all">
                  <PencilIcon />
                </button>
                <button @click="openDeleteModal(user)"
                  class="text-red-600 hover:bg-red-100 p-2 rounded-full transition-all">
                  <TrashIcon />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="md:hidden space-y-2">
      <div v-for="user in filteredUsers" :key="user.id"
        class="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
        <div>
          <div class="font-semibold text-gray-900 text-base">{{ user.name }}</div>
          <div class="text-sm text-gray-500">{{ user.email }}</div>
          <div class="text-sm text-gray-400">
            <span>Edad: {{ user.age }}</span>
            <span class="ml-2">Creado: {{ formatDate(user.createdAt) }}</span>
          </div>
        </div>
        <div class="flex flex-col space-y-2">
          <button @click="openEditModal(user)" class="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition-all">
            <PencilIcon />
          </button>
          <button @click="openDeleteModal(user)" class="text-red-600 hover:bg-red-100 p-2 rounded-full transition-all">
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>

    <div v-if="filteredUsers.length === 0" class="text-center text-gray-500 p-4 bg-white rounded-lg shadow-md">
      No se encontraron usuarios
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { PencilIcon, TrashIcon } from 'lucide-vue-next';
import type { IUser } from '../interfaces/User';

const props = defineProps({
  users: {
    type: Array as () => IUser[],
    required: true,
  },
  searchTerm: {
    type: String,
    default: '',
  },
});

const filteredUsers = computed(() => {
  return props.users.filter(user =>
    user.name.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(props.searchTerm.toLowerCase())
  );
});

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const emit = defineEmits(['openEditModal', 'openDeleteModal']);

const openEditModal = (user: IUser) => {
  emit('openEditModal', user);
};

const openDeleteModal = (user: IUser) => {
  emit('openDeleteModal', user);
};
</script>
