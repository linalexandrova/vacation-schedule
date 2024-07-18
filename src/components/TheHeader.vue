<script setup lang="ts">
import { computed } from 'vue';
import { ROUTES_NAMES } from '@/config/routes';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const allEmployee = computed(
  () => authStore.isEmployee || authStore.isChief || authStore.isHr || authStore.isAdmin,
);
const isHrAndAdmin = computed(() => authStore.isHr || authStore.isAdmin);
</script>

<template>
  <header class="header">
    <div class="header-container container">
      <!-- <div>Logo</div>
      <span>{{ authStore.isAuthenticated ? 'true' : 'false' }}</span> -->
      <nav>
        <ul class="menu-links">
          <li><Router-Link class="link" :to="{ name: ROUTES_NAMES.HOME }">Home</Router-Link></li>
          <template v-if="authStore.isAuthenticated">
            <li v-if="allEmployee">
              <Router-Link class="link" :to="{ name: ROUTES_NAMES.SCHEDULE }">Schedule</Router-Link>
            </li>
            <li v-if="authStore.isChief">
              <Router-Link class="link" :to="{ name: ROUTES_NAMES.DEPARTMENT }">
                Department
              </Router-Link>
            </li>
            <li v-if="isHrAndAdmin">
              <Router-Link class="link" :to="{ name: ROUTES_NAMES.HR_MANAGER }">HR</Router-Link>
            </li>
            <li v-if="authStore.isAdmin">
              <Router-Link class="link" :to="{ name: ROUTES_NAMES.ADMIN_DASHBOARD }">
                Admin
              </Router-Link>
            </li>
          </template>
        </ul>
      </nav>
      <div>
        <template v-if="!authStore.isAuthenticated">
          <Router-Link class="link" :to="{ name: ROUTES_NAMES.SIGN_UP }">Sign Up</Router-Link>
          <Router-Link class="link" :to="{ name: ROUTES_NAMES.SIGN_IN }">Sign In</Router-Link>
        </template>
        <Router-Link v-else class="link" to="/logout"> Logout </Router-Link>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: burlywood;
}

.header-container {
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
}

.menu-links {
  padding: 0;
  display: flex;
  gap: 12px;
  list-style: none;
}

.link {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.link:hover {
  background-color: #ddd;
  color: #333;
}
</style>
