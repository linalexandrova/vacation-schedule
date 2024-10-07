<template>
  <div>
    <p v-if="!isAuthenticated">Пользователь не авторизован</p>
    <p v-if="isAuthenticated">Пользователь авторизован</p>
    <p v-if="isAdmin">Администратор</p>
    <p v-if="isEmployee">Обычный пользователь</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
  name: 'NavigationBar',
  components: {},
  setup() {
    const authStore = useAuthStore();

    const isAuthenticated = authStore.isAuthenticated;
    const isAdmin = authStore.isAdmin;
    const isEmployee = authStore.isEmployee;

    return {
      isAuthenticated,
      isAdmin,
      isEmployee,
    };
  },
});
</script>
