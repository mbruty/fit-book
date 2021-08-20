import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Search from '@/views/Search.vue';
import LoginSignup from '@/views/Login-Signup.vue';
import { user, breadcrumb } from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: {
      title: 'Search',
    },
  },
  {
    path: '/login',
    name: 'Login / Signup',
    component: LoginSignup,
    meta: {
      title: 'Login / Signup',
    },
  },
  {
    path: '/workouts/create',
    name: 'Create A Workout',
    component: LoginSignup,
    meta: {
      title: 'Search',
      breadcrumb: ['workouts'],
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  window.document.title = `FITBOOK${to.meta.title ? ` - ${to.meta.title}` : ''}`;

  breadcrumb.value = to.meta.breadcrumb ? (to.meta.breadcrumb) as Array<string> : [''];
});

router.beforeEach((to, from, next) => {
  // If the route requires auth & the user is not logged in, go to login page
  if (to.meta.requiresAuth && !user.isLoggedIn) {
    next('/login');
    return;
  }

  next();
});

export default router;
