<script setup lang="ts">
import RolesListItem from './RolesListItem.vue';
import { type Role } from '@/types';

interface RolesListProps {
  roles: Role[];
}

defineProps<RolesListProps>();
</script>

<template>
  <div class="roles">
    <RolesListItem v-for="role in roles" :key="role.id" :role="role" />
  </div>
</template>

<style scoped>
.roles {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
