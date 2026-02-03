<template>
  <header
    class="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-3 group cursor-pointer">
        <div
          class="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-xl rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-primary/20">
          <span class="material-symbols-outlined text-2xl">handyman</span>
        </div>
        <div class="flex flex-col -space-y-1">
          <span class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">JoGigs</span>
          <span class="text-[10px] font-bold text-primary uppercase tracking-widest">Amman & Beyond</span>
        </div>
      </router-link>

      <!-- Navigation -->
      <nav class="hidden md:flex items-center gap-8">
        <a class="text-sm font-bold text-slate-600 hover:text-primary transition-colors"
          href="#how-it-works">How it Works</a>
        <a class="text-sm font-bold text-slate-600 hover:text-primary transition-colors"
          href="#become-pro">Become a Pro</a>
        <a class="text-sm font-bold text-slate-600 hover:text-primary transition-colors"
          href="#neighborhoods">Neighborhoods</a>
      </nav>

      <!-- Auth Buttons -->
      <div class="flex items-center gap-5">
        <!-- If NOT logged in -->
        <template v-if="!isLoggedIn">
          <router-link to="/login"
            class="hidden sm:block text-sm font-bold text-primary hover:underline">
            Log In
          </router-link>

          <router-link to="/signup"
            class="bg-primary text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md shadow-primary/30 hover:bg-primary-dark transition-all scale-100 hover:scale-105">
            Sign Up
          </router-link>
        </template>

        <!-- If logged in -->
        <template v-else>
          <button
            @click="handleLogout"
            class="border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-5 py-2.5 rounded-full font-bold text-sm hover:border-primary hover:text-primary transition-all">
            Logout
          </button>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import { logout } from "../api/auth.api";

export default {
  name: "Header",
  data() {
    return {
      isLoggedIn: !!localStorage.getItem("loggedIn"),
    };
  },
  
  watch: {
    $route() {
      this.isLoggedIn = !!localStorage.getItem("loggedIn");
    }
  },
  methods: {
    async handleLogout() {
      try {
        await logout();
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("accessToken"); 
        this.isLoggedIn = false;
        this.$router.push("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        localStorage.removeItem("loggedIn");
        this.isLoggedIn = false;
        this.$router.push("/login");
      }
    },
  },
};
</script>
