import { ref } from 'vue';
import { defineStore } from 'pinia';
import { STORES_NAMES } from '@/config/stores';
import {
  createRole as createServerRole,
  fetchRoles,
  removeRole,
  type RoleData,
} from '@/server/roles';
import { convertObjectToArray } from '@/utils';
import type { Role } from '@/types';

export const useRolesStore = defineStore(STORES_NAMES.ROLES, () => {
  const roles = ref<Role[]>([]);

  function getNameByRoleId(id: string) {
    return roles.value.find((role) => role.id === id)?.name;
  }
  function getRoleFromUser(roleId: string) {
    return roles.value.find((role) => role.id === roleId);
  }

  async function getRoles() {
    try {
      const rolesSnapshot = await fetchRoles();
      roles.value = convertObjectToArray<Role>(rolesSnapshot as object);
    } catch (error) {
      console.error(error);
    }
  }

  async function createRole(roleData: RoleData) {
    try {
      await createServerRole(roleData);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteRole(roleId: string) {
    try {
      await removeRole(roleId);
    } catch (error) {
      console.error(error);
    }
  }

  function $reset() {
    roles.value = [];
  }

  return { roles, getNameByRoleId, getRoleFromUser, getRoles, createRole, deleteRole, $reset };
});
