<template>
  <header class="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-3 group cursor-pointer">
        <div class="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-xl rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-primary/20">
          <span class="material-symbols-outlined text-2xl">handyman</span>
        </div>
        <div class="flex flex-col -space-y-1">
          <span class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">JoGigs</span>
          <span class="text-[10px] font-bold text-primary uppercase tracking-widest">Amman &amp; Beyond</span>
        </div>
      </router-link>

      <!-- Navigation -->
      <nav class="hidden md:flex items-center gap-8">
        <template v-if="isLoggedIn">
          <router-link to="/dashboard"
            class="text-sm font-bold text-primary border-b-2 border-primary pb-1 transition-all">
            Dashboard
          </router-link>
        </template>
        <template v-else>
          <span class="text-sm font-medium text-slate-400">Welcome to JoGigs</span>
        </template>
      </nav>

      <!-- Right Side Actions -->
      <div class="flex items-center gap-5">

        <!-- Message Icon + Dropdown (only when logged in) -->
        <div v-if="isLoggedIn" class="relative" ref="msgDropdown">
          <button
            id="msg-bell-btn"
            @click="toggleMessages"
            class="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Messages"
          >
            <span class="material-symbols-outlined text-slate-600 dark:text-slate-300 text-2xl">chat</span>
            <!-- Unread badge -->
            <span v-if="unreadCount > 0"
              class="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center">
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
          </button>

          <!-- Dropdown -->
          <transition name="dropdown">
            <div v-if="showMessages"
              class="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50">

              <!-- Dropdown Header -->
              <div class="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                <h3 class="font-bold text-sm text-slate-900 dark:text-white">Messages</h3>
              </div>

              <!-- Conversation List -->
              <div class="max-h-72 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800">
                <div v-if="conversationList.length === 0"
                  class="px-4 py-8 text-center text-slate-400 text-sm">
                  No conversations yet.
                </div>

                <router-link
                  v-for="conv in conversationList"
                  :key="conv.id"
                  :to="`/chat/${conv.withUserId}`"
                  @click="showMessages = false"
                  class="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <!-- Avatar -->
                  <div class="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span class="text-primary font-bold text-sm">
                      {{ getInitial(conv.withUserName) }}
                    </span>
                  </div>
                  <!-- Info -->
                  <div class="flex-1 min-w-0">
                    <p class="font-bold text-sm text-slate-800 dark:text-white truncate">
                      {{ conv.withUserName || 'User' }}
                    </p>
                    <p class="text-[11px] text-slate-400 truncate">{{ conv.content || '…' }}</p>
                  </div>
                  <!-- Time -->
                  <span class="text-[10px] text-slate-400 flex-shrink-0">
                    {{ formatTime(conv.createdAt) }}
                  </span>
                </router-link>
              </div>


            </div>
          </transition>
        </div>

        <!-- Auth Buttons -->
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

        <template v-else>
          <button @click="handleLogout"
            class="border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-5 py-2.5 rounded-full font-bold text-sm hover:border-primary hover:text-primary transition-all">
            Logout
          </button>
        </template>
      </div>

    </div>
  </header>
</template>

<script>
import { logout } from '../services/auth.service';
import {
  connect,
  getConversationList,
  onConversationList,
  onNewMessage,
  removeAllListeners,
} from '../services/chat.service';

export default {
  name: 'Header',
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('loggedIn'),
      showMessages: false,
      conversationList: [],
    };
  },

  computed: {
    unreadCount() {
      // Approximate: count conversations that have messages
      return this.conversationList.length;
    },
  },

  watch: {
    $route() {
      this.isLoggedIn = !!localStorage.getItem('loggedIn');
      // Reconnect WebSocket when user logs in
      if (this.isLoggedIn) this.initChat();
    },
  },

  mounted() {
    if (this.isLoggedIn) this.initChat();
    document.addEventListener('click', this.handleOutsideClick);
  },

  beforeUnmount() {
    removeAllListeners();
    document.removeEventListener('click', this.handleOutsideClick);
  },

  methods: {
    initChat() {
      connect();
      onConversationList((list) => {
        this.conversationList = list || [];
      });
      onNewMessage(() => {
        // Refresh conversation list on new message
        getConversationList();
      });
      // Request the initial list
      getConversationList();
    },

    toggleMessages() {
      this.showMessages = !this.showMessages;
      if (this.showMessages) {
        // Refresh list on open
        getConversationList();
      }
    },

    handleOutsideClick(e) {
      const el = this.$refs.msgDropdown;
      if (el && !el.contains(e.target)) {
        this.showMessages = false;
      }
    },

    getInitial(name) {
      return name ? name.charAt(0).toUpperCase() : '?';
    },

    formatTime(dateStr) {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      const now = new Date();
      const diffMs = now - d;
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return 'now';
      if (diffMins < 60) return `${diffMins}m`;
      const diffHrs = Math.floor(diffMins / 60);
      if (diffHrs < 24) return `${diffHrs}h`;
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    },

    async handleLogout() {
      try {
        await logout();
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('accessToken');
        this.isLoggedIn = false;
        this.conversationList = [];
        this.showMessages = false;
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
</style>
