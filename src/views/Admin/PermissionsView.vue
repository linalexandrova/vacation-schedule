<script setup lang="ts">
import { onMounted } from 'vue';
import UsersList from '@/components/Admin/UsersList.vue';
import { useUsersStore } from '@/stores/users';
import { useRolesStore } from '@/stores/roles';

const usersStore = useUsersStore();
const rolesStore = useRolesStore();

onMounted(() => {
  void usersStore.getUsers();
  void rolesStore.getRoles();
});
</script>

<template>
  <div>
    <h2 class="title">Permissions</h2>
    <UsersList :users="usersStore.users" />
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 1.5rem;
}
</style>
