import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ScheduleView from '@/views/Schedule/ScheduleView.vue';
import DepartmentView from '@/views/Department/DepartmentView.vue';
import HrView from '@/views/HR/HrView.vue';
import SignUpView from '@/views/SignUpView.vue';
import SignInView from '@/views/SignInView.vue';
import LogoutView from '@/views/LogoutView.vue';
import AdminView from '@/views/Admin/AdminView.vue';
import AdminDashboardView from '@/views/Admin/DashboardView.vue';
import AdminRolesView from '@/views/Admin/RolesView.vue';
import AdminPermissionsView from '@/views/Admin/PermissionsView.vue';
import { ROUTES_NAMES } from '@/config/routes';
import { ROLES } from '@/config/roles';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    name: ROUTES_NAMES.HOME,
    component: HomeView,
  },
  {
    path: '/schedule',
    name: ROUTES_NAMES.SCHEDULE,
    component: ScheduleView,
    meta: {
      requiresAuth: true,
      allowedRoles: [ROLES.ADMIN, ROLES.HR_MANAGER, ROLES.CHIEF, ROLES.EMPLOYEE],
    },
  },
  {
    path: '/department',
    name: ROUTES_NAMES.DEPARTMENT,
    component: DepartmentView,
    meta: {
      requiresAuth: true,
      allowedRoles: [ROLES.CHIEF],
    },
  },
  {
    path: '/hr',
    name: ROUTES_NAMES.HR_MANAGER,
    component: HrView,
    meta: {
      requiresAuth: true,
      allowedRoles: [ROLES.HR_MANAGER],
    },
  },
  {
    path: '/sign-up',
    name: ROUTES_NAMES.SIGN_UP,
    component: SignUpView,
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/sign-in',
    name: ROUTES_NAMES.SIGN_IN,
    component: SignInView,
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/admin',
    name: ROUTES_NAMES.ADMIN,
    component: AdminView,
    meta: {
      requiresAuth: true,
      allowedRoles: [ROLES.ADMIN],
    },
    children: [
      {
        path: '',
        name: ROUTES_NAMES.ADMIN_DASHBOARD,
        component: AdminDashboardView,
        meta: {
          requiresAuth: true,
          allowedRoles: [ROLES.ADMIN],
        },
      },
      {
        path: 'roles',
        name: ROUTES_NAMES.ADMIN_ROLES,
        component: AdminRolesView,
        meta: {
          requiresAuth: true,
          allowedRoles: [ROLES.ADMIN],
        },
      },
      {
        path: 'permissions',
        name: ROUTES_NAMES.ADMIN_PERMISSIONS,
        component: AdminPermissionsView,
        meta: {
          requiresAuth: true,
          allowedRoles: [ROLES.ADMIN],
        },
      },
    ],
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView,
    meta: { requiresAuth: true },
  },
  {
    path: '/:catchAll(.*)',
    redirect: () => ({ name: ROUTES_NAMES.HOME }),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach(async (to) => {
  // console.log(`🚦 navigating to ${to.name} from ${from.name}`);
  const authStore = useAuthStore();

  if (to.name === 'logout') {
    await authStore.logout();
    return { name: ROUTES_NAMES.HOME, replace: true };
  }

  await authStore.getAuthenticatedUser();
  // console.log('Router authUser:', authUser);

  const allowedRoles = to.meta.allowedRoles as string[];
  if (to.meta.requiresAuth) {
    // console.log('requiresAuth');
    if (authStore.isAuthenticated) {
      // console.log('isAuthenticated');
      if (allowedRoles.includes(authStore.currentAuthUser!.role)) {
        // console.log('allowedRoles.includes');
        return true;
      } else {
        // console.log('allowedRoles.includes else');
        return false;
      }
    } else {
      // console.log('isAuthenticated else');
      return { name: ROUTES_NAMES.SIGN_IN, query: { redirectTo: to.path } };
    }
  } else if (to.meta.requiresGuest) {
    // console.log('requiresGuest');
    if (!authStore.isAuthenticated) {
      // console.log('requiresGuest not Authenticated');
      return true;
    } else {
      // console.log('requiresGuest isAuthenticated');
      return { name: ROUTES_NAMES.HOME };
    }
  } else {
    // console.log('else');
    return true;
  }
});

export default router;
