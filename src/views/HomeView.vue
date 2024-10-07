<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import { useAuthStore } from '@/stores/auth';
import { getAuth } from 'firebase/auth';

const authStore = useAuthStore();

function getAuthData() {
  const auth = getAuth();
  console.log(auth);
}

async function fetchUserData() {
  const user = await authStore.getAuthenticatedUser();
  console.log(user);
}
</script>

<template>
  <TheHeader />
  <main>
    <button type="button" @click="getAuthData">Get Auth</button>
    <button type="button" @click="fetchUserData">Fetch User</button>
  </main>
</template>
