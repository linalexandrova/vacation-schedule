<template>
  <div>
    <div>RolesPage</div>
    <base-link :to="{ name: 'home' }"> Home </base-link>
    <ul>
      <ul>
        <li v-for="role in roles" :key="role.id">
          {{ role.name }} - {{ role.id }}
          <button @click.prevent="removeRole(role.id)">Удалить роль {{ role.name }}</button>
        </li>
      </ul>
    </ul>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Введите название роли" v-model="name" required />
      <button type="submit">Сохранить</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseLink from '@/components/BaseLink.vue';
import { createRole, fetchRoles, removeRole, type RoleData } from '@/server/roles';

export default defineComponent({
  name: 'RolesPage',
  components: {
    BaseLink,
  },
  data() {
    return {
      name: '',
      roles: [] as RoleData[],
    };
  },
  methods: {
    async onSubmit() {
      const userData: RoleData = {
        name: this.name,
      };

      try {
        await createRole(userData);
        await this.fetchRoles();
      } catch (error) {
        let result = (error as Error).message;
        console.log(result);
      }
    },
    async fetchRoles() {
      try {
        const roles = await fetchRoles();
        this.roles = Object.keys(roles).map((key) => ({
          id: key,
          ...roles[key],
        }));
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    async removeRole(id: string) {},
  },
  async mounted() {
    await this.fetchRoles();
  },
});
</script>

<style lang="sass" scoped></style>
