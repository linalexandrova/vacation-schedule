<script setup lang="ts">
import { ref, unref } from 'vue';
import TheHeader from '@/components/TheHeader.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { ROUTES_NAMES } from '@/config/routes';

const router = useRouter();
const authStore = useAuthStore();

const formData = ref({
  email: '',
  password: '',
});

async function signUp() {
  const userData = {
    email: unref(formData).email.toLowerCase(),
    password: unref(formData).email.toLowerCase(),
  };
  await authStore.registerUser(userData);
  await router.push({ name: ROUTES_NAMES.HOME });
}
</script>

<template>
  <TheHeader />
  <main>
    <form class="sign-up-form" @submit.prevent="signUp">
      <div>
        <label for="email">Email</label>
        <input v-model="formData.email" type="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="formData.password" type="password" />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </main>
</template>

<style scoped>
.sign-up-form {
  margin: 0 auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
