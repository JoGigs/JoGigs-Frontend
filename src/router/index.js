import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";
import ForgotPassword from "../pages/ForgotPassword.vue";
import CreateService from "../pages/CreateService.vue";
import ServiceCategory from "../pages/ServiceCategory.vue";

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
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
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


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
