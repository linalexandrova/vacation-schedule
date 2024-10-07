<template>
  <div>
    <navigation-bar></navigation-bar>
    <div>RolesPage</div>
    <base-link :to="{ name: 'home' }"> Home </base-link>
    <ul>
      <ul>
        <li v-for="role in roles" :key="role.id">
          {{ role.name }} - {{ role.id }}
          <button @click.prevent="removeRoleById(role.id)">Удалить роль {{ role.name }}</button>
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
import { defineComponent, ref, onMounted } from 'vue';
import BaseLink from '@/components/BaseLink.vue';
import { createRole, fetchRoles, removeRole, type RoleData } from '@/server/roles';
import NavigationBar from '@/components/NavigationBar.vue';

export default defineComponent({
  name: 'RolesPage',
  components: {
    BaseLink,
    NavigationBar,
  },
  setup() {
    const name = ref('');
    const roles = ref<RoleData[]>([]);

    //Создание роли
    const onSubmit = async () => {
      const userData: RoleData = {
        name: name.value,
      };

      try {
        await createRole(userData);
        name.value = '';
        await fetchRolesList();
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    //Получение списка ролей
    const fetchRolesList = async () => {
      try {
        const fetchedRoles = await fetchRoles();
        roles.value = Object.keys(fetchedRoles).map((key) => ({
          id: key,
          ...fetchedRoles[key],
        }));
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    //Удаление роли
    const removeRoleById = async (id: string) => {
      try {
        await removeRole(id);
        await fetchRolesList();
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    onMounted(fetchRolesList);

    return {
      name,
      roles,
      onSubmit,
      removeRoleById,
    };
  },
});
</script>

<style lang="sass" scoped></style>
