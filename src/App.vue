<template>
  <div v-if="isLoading || isLoadingSearch">
    <Loading />
  </div>
  <div v-else-if="isError || isSearchError">
    <Error :error="error!.message" />
  </div>
  <div v-else>
    <div class="min-h-screen bg-gray-50 p-4 md:p-8">
      <div class="max-w-full md:max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div class="md:flex justify-between items-center p-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold">Gestión de Usuarios</h2>
          <button @click="openAddModal"
            class="flex items-center text-blue-600 hover:bg-blue-100 p-2 rounded-full transition-all">
            <PlusCircleIcon class="mr-2" /> Agregar Usuario
          </button>
        </div>

        <UserSearch v-model="searchTerm" />
        <UserTable :users="filteredUsers" @openEditModal="openEditModal" @openDeleteModal="openDeleteModal" />
        <Pagination :total-items="totalPages || 10" :items-per-page="itemsPerPage" :current-page="currentPage"
          @page-change="handlePageChange" />
        <UserEditModal v-if="isEditModalOpen" :user="currentUser!" :isOpen="isEditModalOpen"
          @close="isEditModalOpen = false" @save="saveUser" @update="updateUser" />
        <UserDeleteModal v-if="isDeleteModalOpen" :user="currentUser!" :isOpen="isDeleteModalOpen"
          @close="isDeleteModalOpen = false" @delete="confirmDelete" />
        <UserAddModal :isOpen="isAddModalOpen" @close="isAddModalOpen = false" @add="addNewUser" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { PlusCircleIcon } from 'lucide-vue-next';
import UserTable from './components/UserTable.vue';
import UserSearch from './components/UserSearch.vue';
import UserEditModal from './components/UserEditModal.vue';
import UserDeleteModal from './components/UserDeleteModal.vue';
import UserAddModal from './components/UserAddModal.vue';
import type { IUser } from './interfaces/User';
import { useUserQuery } from './composables/useUserQuery';
import Loading from './components/Loading.vue';
import Error from './components/Error.vue';
import Pagination from './components/Pagination.vue';
import { useDeleteUser } from './composables/useDeleteUser';
import { useUpdateUser } from './composables/useUpdateUser';
import { useSearchUserQuery } from './composables/useSearchUserQuery';
import { useCreateUser } from './composables/useCreateUser';

const users = ref<IUser[]>([]);

const searchTerm = ref('');
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isAddModalOpen = ref(false);
const currentUser = ref<IUser | null>();
const currentPage = ref(1);
const totalPages = ref(0);

const { data, isError, isLoading, error, refetch } = useUserQuery(currentPage);
const { data: searchData, isError: isSearchError, isLoading: isLoadingSearch, refetch: searchRefetch } = useSearchUserQuery(searchTerm);

const { mutate: deleteUser } = useDeleteUser();
const { mutate: addUserMutation } = useCreateUser();
const { mutate: updateUserMutation } = useUpdateUser();
const itemsPerPage = ref(10);

watch(data, (newData) => {
  if (newData) {
    users.value = [...newData.users];
    totalPages.value = newData.total;
  }
}, { immediate: true });

watch(searchData, (newData) => {
  if (newData) {
    totalPages.value = newData.total;
  }
}, { immediate: true });

watch(currentPage, () => {
  refetch();
}, { immediate: true });

const filteredUsers = computed(() => {
  return searchTerm.value ? searchData.value?.users || [] : users.value;
});

watch(searchTerm, () => {
  searchRefetch();
}, { immediate: true });

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const openEditModal = (user: IUser) => {
  currentUser.value = { ...user };
  isEditModalOpen.value = true;
};

const openDeleteModal = (user: IUser) => {
  currentUser.value = user;
  isDeleteModalOpen.value = true;
};

const openAddModal = () => {
  isAddModalOpen.value = true;
};

const saveUser = () => {
  if (currentUser.value) {
    const index = users.value.findIndex(u => u.id === currentUser.value?.id);
    if (index !== -1) {
      users.value[index] = { ...currentUser.value };
    }
    isEditModalOpen.value = false;
  }
};

const confirmDelete = () => {
  if (currentUser.value) {
    users.value = users.value.filter(u => u.id !== currentUser.value!.id);
    isDeleteModalOpen.value = false;

    deleteUser(currentUser.value.id!, {
      onSuccess: () => {
        refetch();
      },
      onError: (error: any) => {
        const messages = error.response.data.message;
        const type = typeof messages;
        if (type === 'string') {
          alert(`${messages}`);
        }
        else {
          alert(`${messages.join('\n')}`);
        }
      },
    });
  }
};

const addNewUser = (user: IUser) => {
  isAddModalOpen.value = false;
  addUserMutation(user, {
    onSuccess: () => {
      refetch();
    },
    onError: (error: any) => {
      const messages = error.response.data.message;
      const type = typeof messages;
      if (type === 'string') {
        alert(`${messages}`);
      }
      else {
        alert(`${messages.join('\n')}`);
      }
    },
  });
};

const updateUser = (user: IUser) => {
  const index = users.value.findIndex(u => u.id === user.id);
  if (index !== -1) {
    updateUserMutation(user, {
      onSuccess: () => {
        users.value[index] = { ...user };
        refetch();
      },
      onError: (error: any) => {
        const messages = error.response.data.message;
        const type = typeof messages;
        if (type === 'string') {
          alert(`${messages}`);
        }
        else {
          alert(`${messages.join('\n')}`);
        }
      },
    });
  }
};
</script>
