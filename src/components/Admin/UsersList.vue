<script setup lang="ts">
import UsersListItem from './UsersListItem.vue';
import { type User } from '@/types';

interface UsersListProps {
  users: User[];
}

defineProps<UsersListProps>();
</script>

<template>
  <div class="users">
    <UsersListItem v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>

<style scoped>
.users {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
