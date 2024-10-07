import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const authId = ref<string | null>(null);
  const currentUser = ref<{ role: string } | null>(null);

  const isAuthenticated = computed(() => currentUser.value !== null);

  const isAdmin = computed(() => currentUser.value?.role === 'admin');
  const isChief = computed(() => currentUser.value?.role === 'chief');
  const isHR = computed(() => currentUser.value?.role === 'hr-manager');
  const isEmployee = computed(() => currentUser.value?.role === 'employee');

  const setAuthUser = (user: { authId: string; role: string } | null) => {
    if (user) {
      authId.value = user.authId;
      currentUser.value = { role: user.role };
    } else {
      authId.value = null;
      currentUser.value = null;
    }
  };

  return {
    authId,
    currentUser,
    isAuthenticated,
    isAdmin,
    isChief,
    isHR,
    isEmployee,
    setAuthUser,
  };
});
