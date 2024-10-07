import { ref } from 'vue';
import { defineStore } from 'pinia';
import { STORES_NAMES } from '@/config/stores';
import { convertObjectToArray } from '@/utils';
import { fetchUsers, setRoleToUser as setServerRoleToUser } from '@/server/users';
import type { User } from '@/types';

export const useUsersStore = defineStore(STORES_NAMES.USERS, () => {
  const users = ref<User[]>([]);

  async function getUsers() {
    try {
      const usersSnapshot = await fetchUsers();
      users.value = convertObjectToArray<User>(usersSnapshot as object);
    } catch (error) {
      console.error(error);
    }
  }

  async function setRoleToUser(userId: string, roleId: string) {
    try {
      await setServerRoleToUser(userId, roleId);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    users,
    getUsers,
    setRoleToUser,
  };
});
