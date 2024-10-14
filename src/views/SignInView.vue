<script setup lang="ts">
import { ref, unref } from 'vue';
import TheHeader from '@/components/TheHeader.vue';
import { useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { ROUTES_NAMES } from '@/config/routes';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const formData = ref({
  email: '',
  password: '',
});

async function signIn() {
  const userData = {
    email: unref(formData).email.toLowerCase(),
    password: unref(formData).email.toLowerCase(),
  };

  await authStore.login(userData);

  const redirectTo = (route.query.redirectTo as string) || { name: ROUTES_NAMES.HOME };
  console.log('redirectTo', redirectTo);

  await router.push(redirectTo);
}
</script>

<template>
  <TheHeader />
  <main>
    <form class="sign-in-form" @submit.prevent="signIn">
      <div>
        <label for="email">Email</label>
        <input v-model="formData.email" type="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="formData.password" type="password" />
      </div>
      <button type="submit">Sign In</button>
    </form>
  </main>
</template>

<style scoped>
.sign-in-form {
  margin: 0 auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
