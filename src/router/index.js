import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";
import CreateService from "../pages/CreateService.vue";
import ServiceCategory from "../pages/ServiceCategory.vue";
import ServiceDetails from "../pages/ServiceDetails.vue";
import ChatWindow from "../pages/ChatWindow.vue";
import Dashboard from "../pages/Dashboard.vue";
import Profile from "../pages/Profile.vue";
 
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/create-service",
    name: "CreateService",
    component: CreateService,
  },
  {
    path: "/services/:category",
    name: "ServiceCategory",
    component: ServiceCategory,
  },
  {
    path: "/service/:id",
    name: "ServiceDetails",
    component: ServiceDetails,
  },
  {
    path: "/chat/:id",
    name: "ChatWindow",
    component: ChatWindow,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Routes that require the user to be logged in
const protectedPaths = ['/dashboard', '/create-service', '/chat', '/profile'];

router.beforeEach((to, _from, next) => {
  const isLoggedIn = !!localStorage.getItem('loggedIn');
  const needsAuth = protectedPaths.some((p) => to.path.startsWith(p));

  if (needsAuth && !isLoggedIn) {
    return next('/login');
  }

  if (isLoggedIn) {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user.type === 'professional') {
        const customerPages = ['/', '/services'];
        if (customerPages.some(p => to.path === p || to.path.startsWith(p + '/'))) {
          return next('/dashboard');
        }
      }
    } catch {}
  }

  next();
});

export default router;
