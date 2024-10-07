<script setup lang="ts">
import type { Role } from '@/types';
import { useRolesStore } from '@/stores/roles';

interface RolesListItemProps {
  role: Role;
}

const props = defineProps<RolesListItemProps>();

const rolesStore = useRolesStore();

async function deleteRole() {
  await rolesStore.deleteRole(props.role.id);
  await rolesStore.getRoles();
}
</script>

<template>
  <div class="role">
    <div class="role__id-wrapper">
      <span class="role__id">{{ role.id }}</span>
    </div>
    <span class="role__name">{{ role.name }}</span>
    <button type="button" @click="deleteRole">Delete Role</button>
  </div>
</template>

<style scoped>
.role {
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid #cecece;
  border-radius: 4px;
}

.role__id-wrapper {
  width: max-content;
}

.role__id {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.2;
  text-decoration: underline;
}

.role__name {
  width: max-content;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
}
</style>
