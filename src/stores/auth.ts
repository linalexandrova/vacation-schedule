import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { STORES_NAMES } from '@/config/stores';
import { getAuth, signOut } from 'firebase/auth';
import {
  fetchAuthUser,
  loginWithEmailAndPassword,
  registerUserWithEmailAndPassword,
  type UserCredentials,
} from '@/server/auth';
import type { AuthUser } from '@/types';
import { ROLES } from '@/config/roles';

export const useAuthStore = defineStore(STORES_NAMES.AUTH, () => {
  const authId = ref<string | null>(null);
  const currentAuthUser = ref<AuthUser | null>(null);

  const isAuthenticated = computed(() => currentAuthUser.value !== null);

  const isEmployee = computed(() => {
    if (!currentAuthUser.value) {
      return false;
    }

    return currentAuthUser.value.role === ROLES.EMPLOYEE;
  });

  const isChief = computed(() => {
    if (!currentAuthUser.value) {
      return false;
    }

    return currentAuthUser.value.role === ROLES.CHIEF;
  });

  const isHr = computed(() => {
    if (!currentAuthUser.value) {
      return false;
    }

    return currentAuthUser.value.role === ROLES.HR_MANAGER;
  });

  const isAdmin = computed(() => {
    if (!currentAuthUser.value) {
      return false;
    }

    return currentAuthUser.value.role === ROLES.ADMIN;
  });

  function setAuthUser(user: AuthUser | null) {
    if (!user) {
      currentAuthUser.value = null;
      authId.value = null;
      return;
    }

    currentAuthUser.value = user;
    authId.value = user.id;
  }

  async function registerUser(userData: UserCredentials) {
    try {
      await registerUserWithEmailAndPassword(userData);
    } catch (error) {
      console.error(error);
    }
  }

  async function getAuthenticatedUser() {
    try {
      const userSnapshot = await fetchAuthUser();
      // console.log('userSnapshot', userSnapshot);

      if (userSnapshot) {
        setAuthUser(userSnapshot as AuthUser);
      }

      return userSnapshot as AuthUser;
    } catch (error) {
      setAuthUser(null);
      console.error(error);
      return null;
    }
  }

  async function login(userData: UserCredentials) {
    try {
      await loginWithEmailAndPassword(userData);
    } catch (error) {
      console.error(error);
    }
  }

  function logout() {
    const auth = getAuth();
    return signOut(auth).then(() => {
      setAuthUser(null);
    });
  }

  return {
    authId,
    currentAuthUser,
    isAuthenticated,
    isEmployee,
    isChief,
    isHr,
    isAdmin,
    registerUser,
    getAuthenticatedUser,
    login,
    logout,
  };
});
