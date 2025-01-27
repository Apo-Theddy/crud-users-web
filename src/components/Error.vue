<template>
  <div class=" min-h-screen w-full flex flex-col justify-center items-center bg-white">
    <img src="../assets/svgs/error.svg" alt="Error illustration" class="w-96 h-96 mx-auto mt-10" />
    <h2 class="text-2xl font-bold text-red-600 mt-4">Ocurrió un Error</h2>
    <p class="text-lg text-gray-500 mt-2 text-center px-4">
      {{ error || "Ha ocurrido un problema inesperado. Inténtalo de nuevo más tarde." }}
    </p>
  </div>
</template>

<script setup lang="ts">
const { error } = defineProps({
  error: {
    type: String,
    default: "Algo salió mal, por favor intenta nuevamente."
  }
});
</script>

<style scoped></style>
