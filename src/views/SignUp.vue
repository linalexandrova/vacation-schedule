<template>
  <div>
    <div>SignUp</div>
    <base-link :to="{ name: 'home' }"> Home </base-link>
    <form @submit.prevent="onSubmit">
      <input type="email" placeholder="Введите ваш e-mail" v-model="email" required />
      <input type="password" placeholder="Введите ваш пароль" v-model="password" required />
      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseLink from '@/components/BaseLink.vue';
import { registerUserWithEmailAndPassword, type UserCredentials } from '@/server/auth';

export default defineComponent({
  name: 'SignUp',
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
        await registerUserWithEmailAndPassword(userData);
        console.log('Пользователь успешно зарегистрирован');
      } catch (error) {
        let result = (error as Error).message;

        if (result.search('email-already-in-use') != -1) {
          alert('Пользователь уже зареган');
        } else {
          alert('Что-то пошло не так, попробуйте позже');
        }
      }
    },
  },
});
</script>

<style lang="sass" scoped></style>
