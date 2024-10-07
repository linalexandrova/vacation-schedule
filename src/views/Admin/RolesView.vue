<script setup lang="ts">
import { onMounted, ref } from 'vue';
import RolesList from '@/components/RolesList.vue';
import { useRolesStore } from '@/stores/roles';

const rolesStore = useRolesStore();

const roleName = ref('');

async function getRoles() {
  await rolesStore.getRoles();
}

async function createRole() {
  await rolesStore.createRole({ name: roleName.value });
  roleName.value = '';
  await getRoles();
}

onMounted(() => {
  void getRoles();
});
</script>

<template>
  <div>
    <h2 class="title">Roles</h2>

    <button class="get-btn" type="button" @click="getRoles">Get Roles</button>

    <form @submit.prevent="createRole">
      <div class="text-field">
        <label class="text-field__label" for="role">Create Role</label>
        <div class="text-field__group">
          <input
            id="role"
            v-model="roleName"
            class="text-field__input"
            type="text"
            name="role"
            placeholder="Role name"
          />
          <button class="text-field__btn" type="submit">Create Role</button>
        </div>
      </div>
    </form>

    <RolesList v-if="rolesStore.roles.length" :roles="rolesStore.roles" />
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 1.5rem;
}

.get-btn {
  margin-bottom: 1.5rem;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: #eee;
  border: 1px solid #bdbdbd;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.15s ease-in-out;
}

.text-field__label {
  display: block;
  margin-bottom: 0.25rem;
}

.text-field__group {
  display: flex;
}

.text-field__input {
  display: block;
  flex: 1 1 auto;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #bdbdbd;
  border-radius: 0.25rem;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

.text-field__btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: #eee;
  border: 1px solid #bdbdbd;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.15s ease-in-out;
}
.text-field__btn:hover {
  background-color: #bdbdbd;
}
.text-field__group .text-field__input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  position: relative;
  z-index: 2;
}
.text-field__group .text-field__btn {
  position: relative;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left-width: 0;
}
</style>
