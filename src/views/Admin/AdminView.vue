<script setup lang="ts">
import { ROUTES_NAMES } from '@/config/routes';
</script>

<template>
  <header class="header">
    <h1>Admin Dashboard</h1>
  </header>
  <div class="dashboard">
    <div class="container">
      <div class="content-wrapper">
        <aside class="sidebar">
          <nav>
            <ul>
              <li>
                <RouterLink :to="{ name: ROUTES_NAMES.HOME }">Home</RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: ROUTES_NAMES.ADMIN_DASHBOARD }">Dashboard</RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: ROUTES_NAMES.ADMIN_ROLES }">Roles</RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: ROUTES_NAMES.ADMIN_PERMISSIONS }">Permissions</RouterLink>
              </li>
            </ul>
          </nav>
        </aside>
        <main class="main-content">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  padding: 15px 25px;
}

.dashboard {
  padding-top: 40px;
}

.content-wrapper {
  display: flex;
}

.sidebar {
  width: var(--sidebar-width);
}

.main-content {
  width: calc(100% - var(--sidebar-width));
}
</style>
