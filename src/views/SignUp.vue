<template>
  <div>SignUp</div>
  <base-link :to="{ name: 'home' }"> Home </base-link>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import BaseLink from '@/components/BaseLink.vue';

  export default defineComponent({
      name: 'SignUp',
      components: {
          BaseLink,
      },
      methods: {
          async function registerUser(userData) {
  try {
    await registerUserWithEmailAndPassword(userData);
  } catch (error) {
    console.error(error);
  }
}
      }
  });
</script>

<style lang="sass" scoped></style>
