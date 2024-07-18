<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import UiSelect from '../UiSelect.vue';
import type { User } from '@/types';
import { useRolesStore } from '@/stores/roles';
import { useUsersStore } from '@/stores/users';

interface UsersListItemProps {
  user: User;
}

const props = defineProps<UsersListItemProps>();

const rolesStore = useRolesStore();
const usersStore = useUsersStore();
const rolesOptions = computed(() =>
  rolesStore.roles.map((role) => ({ label: role.name, value: role.id })),
);

const selectedRole = ref('');
const requesting = ref(false);

const userRole = computed(() => {
  return rolesStore.getNameByRoleId(props.user.roleId);
});

function changeRole(role: string) {
  selectedRole.value = role;
}

async function setUserRole() {
  requesting.value = true;
  await usersStore.setRoleToUser(props.user.id, selectedRole.value);
  await usersStore.getUsers();
  requesting.value = false;
}

onMounted(async () => {
  await rolesStore.getRoles();
  selectedRole.value = rolesStore.getRoleFromUser(props.user.roleId)?.id || '';
});
</script>

<template>
  <div class="user">
    <div class="user-info">
      <p class="user__text"><span class="user__label">Name:</span> {{ user.name }}</p>
      <p class="user__text"><span class="user__label">Username:</span> {{ user.username }}</p>
      <p class="user__text"><span class="user__label">Email:</span> {{ user.email }}</p>
      <p class="user__text">
        <span class="user__label">Registered Date:</span> {{ user.registeredAt }}
      </p>
      <p class="user__text"><span class="user__label">Role:</span> {{ userRole }}</p>
    </div>
    <div class="role-wrapper">
      <div class="role-select-wrapper">
        <UiSelect
          :options="rolesOptions"
          :value="selectedRole"
          :disabled="requesting"
          @change="changeRole"
        />
      </div>
      <button class="set-role-btn" type="button" :disabled="requesting" @click="setUserRole">
        Set Role to User
      </button>
    </div>
  </div>
</template>

<style scoped>
.user {
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  border: 1px solid #cecece;
  border-radius: 4px;
}

.user__text {
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 400;
}

.user__text:last-child {
  margin-bottom: 0;
}

.user__label {
  font-size: 18px;
  font-weight: 600;
}

.role-wrapper {
  width: 30%;
  display: flex;
  gap: 12px;
}

.role-select-wrapper {
  flex: 2 1 auto;
}

.set-role-btn {
  display: inline-block;
  flex: 1 1 auto;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: #eee;
  border: 1px solid #bdbdbd;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.15s ease-in-out;
}
</style>
