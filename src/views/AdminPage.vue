<template>
  <div>Admin</div>
  <base-link :to="{ name: 'home' }"> Home </base-link>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';
import BaseLink from '@/components/BaseLink.vue';

export default defineComponent({
  name: 'AdminPage',
  components: {
    BaseLink,
  },
});
</script>

<style lang="sass" scoped></style>
