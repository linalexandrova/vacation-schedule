import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import AboutPage from '@/views/AboutPage.vue';
import SchedulePage from '@/views/SchedulePage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import AdminPage from '@/views/AdminPage.vue';
import DepartmentPage from '@/views/DepartmentPage.vue';
import HRPage from '@/views/HRPage.vue';
import LogOut from '@/views/LogOut.vue';
import SignIn from '@/views/SignIn.vue';
import SignUp from '@/views/SignUp.vue';
import RolesPage from '@/views/RolesPage.vue';

const routes = [
  { path: '/', component: HomePage, name: 'home' },
  { path: '/about', component: AboutPage, name: 'about' },
  {
    path: '/admin',
    name: 'admin',
    children: [
      { path: '', component: AdminPage },
      { path: 'settings', component: RolesPage },
    ],
  },
  { path: '/department', component: DepartmentPage, name: 'department' },
  { path: '/schedule', component: SchedulePage, name: 'schedule' },
  { path: '/hr', component: HRPage, name: 'hr' },
  { path: '/logout', component: LogOut, name: 'logout' },
  { path: '/signin', component: SignIn, name: 'signin' },
  { path: '/signup', component: SignUp, name: 'signup' },
  { path: '/:pathMatch(.*)*', component: NotFoundPage, name: 'NotFound' },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue')
//     }
//   ]
// })

// export default router
