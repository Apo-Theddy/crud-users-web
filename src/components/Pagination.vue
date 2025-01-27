<template>
  <div class="flex justify-between items-center m-4">
    <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)"
      class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400">
      <ArrowLeftIcon class="w-7 h-7" />
    </button>

    <div class="flex space-x-2 overflow-x-auto max-sm:mx-6">
      <button v-for="page in totalPages" :key="page" :class="[
        'px-4 py-2 rounded-lg',
        currentPage === page
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 hover:bg-gray-200'
      ]" @click="goToPage(page)">
        {{ page }}
      </button>
    </div>

    <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)"
      class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400">
      <ArrowRightIcon class="w-7 h-7" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-vue-next';
import { computed } from 'vue'

const props = defineProps<{
  totalItems: number
  itemsPerPage: number
  currentPage: number
}>()

const emit = defineEmits(['page-change'])

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('page-change', page)
  }
}
</script>

<style scoped>
button:disabled {
  cursor: not-allowed;
}
</style>
