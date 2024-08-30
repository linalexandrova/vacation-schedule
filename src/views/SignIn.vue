<template>
  <div>
    <div>SignIn</div>
    <base-link :to="{ name: 'home' }"> Home </base-link>
    <form @submit.prevent="onSubmit">
      <input type="email" placeholder="Введите ваш e-mail" v-model="email" required />
      <input type="password" placeholder="Введите ваш пароль" v-model="password" required />
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseLink from '@/components/BaseLink.vue';
import { loginWithEmailAndPassword, type UserCredentials } from '@/server/auth';

export default defineComponent({
  name: 'SignIn',
  components: {
    BaseLink,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async onSubmit() {
      const userData: UserCredentials = {
        email: this.email,
        password: this.password,
      };

      try {
        await loginWithEmailAndPassword(userData);
        console.log('Пользователь существует');
      } catch (error) {
        let result = (error as Error).message;
        console.log(result);
        if (result.search('invalid-credential') != -1) {
          alert('Неверное имя пользователя и/или пароль');
        } else {
          alert('Что-то пошло не так, попробуйте позже');
        }
      }
    },
  },
});
</script>

<style lang="sass" scoped></style>
