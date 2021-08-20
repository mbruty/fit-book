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
      title: 'Create A Workout',
      breadcrumb: ['workouts'],
      requiresAuth: true,
    },
  },
  {
    path: '/workouts/browse',
    name: 'Browse Workouts',
    component: LoginSignup,
    meta: {
      title: 'Browse Workouts',
      breadcrumb: ['workouts'],
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  window.document.title = `FITBOOK${to.meta.title ? ` - ${to.meta.title}` : ''}`;

  // An empty array will cause the breadcrumb to not render
  breadcrumb.value = to.meta.breadcrumb ? (to.meta.breadcrumb) as Array<string> : [];

  // If we aren't on the home route, prepend 'home' to the array
  if (to.meta.title !== 'Home') {
    breadcrumb.value = ['home', ...breadcrumb.value];
  }
});

router.beforeEach((to, from, next) => {
  // If the route requires auth & the user is not logged in, go to login page
  if (to.meta.requiresAuth && !user.isLoggedIn) {
    next('/login');
    return;
  }

  // If we ever get routed to /home, redirect to /
  if (to.path === '/home') {
    next('/');
  }

  next();
});

export default router;
