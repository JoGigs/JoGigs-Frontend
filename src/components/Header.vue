<template>
  <header class="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800">
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

      <!-- Logo -->
      <router-link :to="isLoggedIn && isProfessional ? '/dashboard' : '/'" class="flex items-center gap-3 group cursor-pointer">
        <div class="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-xl rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-primary/20">
          <span class="material-symbols-outlined text-2xl">handyman</span>
        </div>
        <span class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">JoGigs</span>
      </router-link>

      <!-- Navigation (desktop) -->
      <nav class="hidden md:flex items-center gap-6">
        <template v-if="isLoggedIn">
          <template v-if="isProfessional">
            <router-link to="/dashboard" class="flex items-center gap-2 text-sm font-bold transition-all" :class="navActive('/dashboard') ? 'text-primary' : 'text-slate-600 hover:text-primary'">
              <span class="material-symbols-outlined text-lg" :style="navFill('/dashboard')">dashboard</span> Service Management
            </router-link>
          </template>
          <template v-else>
            <router-link to="/" class="flex items-center gap-2 text-sm font-bold transition-all" :class="navActive('/') ? 'text-primary' : 'text-slate-600 hover:text-primary'">
              <span class="material-symbols-outlined text-lg" :style="navFill('/')">home</span> Home
            </router-link>
            <router-link to="/dashboard" class="flex items-center gap-2 text-sm font-bold transition-all" :class="navActive('/dashboard') ? 'text-primary' : 'text-slate-600 hover:text-primary'">
              <span class="material-symbols-outlined text-lg" :style="navFill('/dashboard')">grid_view</span> Dashboard
            </router-link>
          </template>
          <router-link to="/profile"
            class="flex items-center gap-2 group/profile"
            :title="userName">
            <div class="relative">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm transition-all duration-200"
                :class="navActive('/profile')
                  ? 'bg-gradient-to-br from-primary to-primary/70 text-white shadow-md shadow-primary/20'
                  : 'border-2 border-slate-200 text-slate-400 hover:border-primary hover:text-primary group-hover/profile:scale-105'">
                {{ userInitial }}
              </div>
            </div>
            <span class="text-sm font-bold transition-colors hidden lg:block"
              :class="navActive('/profile') ? 'text-primary' : 'text-slate-500 group-hover/profile:text-primary'">{{ userName }}</span>
          </router-link>
        </template>
        <template v-else>
          <router-link to="/" class="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary transition-all">
            <span class="material-symbols-outlined text-lg">home</span> Home
          </router-link>
        </template>
      </nav>

      <!-- Right Side Actions -->
      <div class="flex items-center gap-2">

        <!-- Mobile menu toggle (logged in only) -->
        <button v-if="isLoggedIn" @click="showMobileMenu = !showMobileMenu"
          class="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Menu">
          <span class="material-symbols-outlined text-slate-600 dark:text-slate-300">{{ showMobileMenu ? 'close' : 'menu' }}</span>
        </button>

        <!-- Message Icon + Dropdown (only when logged in) -->
        <div v-if="isLoggedIn" class="relative" ref="msgDropdown">
          <button
            id="msg-bell-btn"
            @click="toggleMessages"
            class="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Messages"
          >
            <span class="material-symbols-outlined text-slate-600 dark:text-slate-300 text-2xl">chat</span>
            <span v-if="unreadCount > 0"
              class="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center">
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
          </button>

          <transition name="dropdown">
            <div v-if="showMessages"
              class="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50">
              <div class="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                <h3 class="font-bold text-sm text-slate-900 dark:text-white">Messages</h3>
              </div>
              <div class="max-h-72 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800">
                <div v-if="conversationList.length === 0"
                  class="px-4 py-8 text-center text-slate-400 text-sm">
                  No conversations yet.
                </div>
                  <router-link
                  v-for="conv in conversationList"
                  :key="conv.id"
                  :to="{ name: 'ChatWindow', params: { id: conv.withUserId }, query: { name: conv.withUserName } }"
                  @click="showMessages = false"
                  class="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors relative"
                  :class="!conv.isRead ? 'bg-primary/5' : ''"
                >
                  <div class="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span class="text-primary font-bold text-sm">{{ getInitial(conv.withUserName) }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm truncate" :class="!conv.isRead ? 'font-black text-slate-900 dark:text-white' : 'font-bold text-slate-800 dark:text-slate-300'">
                      {{ conv.withUserName || 'User' }}
                    </p>
                    <p class="text-[11px] truncate" :class="!conv.isRead ? 'text-slate-600 dark:text-slate-400 font-bold' : 'text-slate-400'">
                      {{ conv.content || '…' }}
                    </p>
                  </div>
                  <div class="flex flex-col items-end gap-1 flex-shrink-0">
                    <span class="text-[10px] text-slate-400">{{ formatTime(conv.createdAt) }}</span>
                    <div v-if="!conv.isRead" class="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                </router-link>
              </div>
            </div>
          </transition>
        </div>

        <!-- Notification Icon + Dropdown -->
        <div v-if="isLoggedIn" class="relative" ref="notifDropdown">
          <button
            @click="toggleNotifications"
            class="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Notifications"
          >
            <span class="material-symbols-outlined text-slate-600 dark:text-slate-300 text-2xl">notifications</span>
            <span v-if="unreadNotifCount > 0"
              class="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
              {{ unreadNotifCount > 9 ? '9+' : unreadNotifCount }}
            </span>
          </button>

          <transition name="dropdown">
            <div v-if="showNotifications"
              class="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50">
              <div class="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h3 class="font-bold text-sm text-slate-900 dark:text-white">Notifications</h3>
                <button @click="markAllNotifsRead" class="text-[10px] font-bold text-primary hover:underline uppercase">Mark all read</button>
              </div>
              <div class="max-h-80 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800">
                <div v-if="notifications.length === 0"
                  class="px-4 py-8 text-center text-slate-400 text-sm">
                  No notifications yet.
                </div>
                <div
                  v-for="n in notifications"
                  :key="n.id"
                  @click="handleNotifClick(n)"
                  class="px-4 py-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer relative"
                  :class="{ 'bg-primary/5': !n.isRead }"
                >
                  <div class="flex gap-3">
                    <div class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                         :class="getNotifColor(n.type)">
                      <span class="material-symbols-outlined text-sm">{{ getNotifIcon(n.type) }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-[13px] leading-tight" :class="n.isRead ? 'text-slate-600 dark:text-slate-400' : 'font-bold text-slate-900 dark:text-white'">
                        {{ n.message }}
                      </p>
                      <p class="text-[10px] text-slate-400 mt-1">{{ formatTime(n.createdAt) }}</p>
                    </div>
                    <div v-if="!n.isRead" class="w-2 h-2 bg-primary rounded-full mt-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Auth Buttons -->
        <template v-if="!isLoggedIn">
          <router-link to="/login" class="hidden sm:block text-sm font-bold text-primary hover:underline">Log In</router-link>
          <router-link to="/signup"
            class="bg-primary text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md shadow-primary/30 hover:bg-primary-dark transition-all scale-100 hover:scale-105">Sign Up</router-link>
        </template>

        <template v-else>
          <button @click="handleLogout"
            class="flex items-center gap-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-5 py-2.5 rounded-full font-bold text-sm hover:border-primary hover:text-primary transition-all">
            <span class="material-symbols-outlined text-lg">logout</span> Logout
          </button>
        </template>
      </div>

    </div>

      <!-- Mobile menu dropdown -->
      <div v-if="showMobileMenu && isLoggedIn"
        class="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-background-dark px-6 py-4 flex flex-col gap-3">
        <template v-if="isProfessional">
          <router-link to="/dashboard" @click="showMobileMenu = false" class="flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-primary transition-all">
            <span class="material-symbols-outlined text-lg">dashboard</span> Service Management
          </router-link>
        </template>
        <template v-else>
          <router-link to="/" @click="showMobileMenu = false" class="flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-primary transition-all">
            <span class="material-symbols-outlined text-lg">home</span> Home
          </router-link>
          <router-link to="/dashboard" @click="showMobileMenu = false" class="flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-primary transition-all">
            <span class="material-symbols-outlined text-lg">grid_view</span> Dashboard
          </router-link>
        </template>
        <router-link to="/profile" @click="showMobileMenu = false" class="flex items-center gap-3 text-sm font-bold text-slate-600 hover:text-primary transition-all">
          <span class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">{{ userInitial }}</span>
          My Profile
        </router-link>
        <button @click="handleLogout; showMobileMenu = false" class="flex items-center gap-3 text-sm font-bold text-red-500 hover:text-red-600 transition-all">
          <span class="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center"><span class="material-symbols-outlined text-lg">logout</span></span>
          Logout
        </button>
      </div>
  </header>
</template>

<script>
import { logout } from '../services/auth.service';
import * as ChatService from '../services/chat.service';
import * as NotificationService from '../services/notification.service';

export default {
  name: 'Header',

  data() {
    return {
      isLoggedIn: !!localStorage.getItem('loggedIn'),
      showMessages: false,
      showNotifications: false,
      showMobileMenu: false,
      notifications: [],
      conversationList: [],
    };
  },

  computed: {
    userName() {
      try {
        return JSON.parse(localStorage.getItem('user') || '{}').fullName || '';
      } catch { return ''; }
    },
    userInitial() {
      const name = this.userName;
      if (!name) return '?';
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
      return name.charAt(0).toUpperCase();
    },
    isProfessional() {
      try {
        return JSON.parse(localStorage.getItem('user') || '{}').type === 'professional';
      } catch { return false; }
    },
    unreadCount() {
      // In this version, we don't have a global count, so we'll just show if any exist in the local list
      // or we can fetch them. For now, let's keep it simple as it was before.
      return this.conversationList.filter(c => !c.isRead).length; // This logic might vary
    },
    unreadNotifCount() {
      return this.notifications.filter(n => !n.isRead).length;
    },
  },

  watch: {
    $route() {
      this.isLoggedIn = !!localStorage.getItem('loggedIn');
    },
  },

  mounted() {
    if (this.isLoggedIn) {
      this.initChat();
      this.initNotifications();
    }
    document.addEventListener('click', this.handleOutsideClick);
    document.addEventListener('click', this.handleMobileOutsideClick);
    document.addEventListener('click', this.handleNotifOutsideClick);
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
    document.removeEventListener('click', this.handleMobileOutsideClick);
    document.removeEventListener('click', this.handleNotifOutsideClick);
  },

  methods: {
    initChat() {
      ChatService.connect();
      ChatService.onConversationList((list) => {
        this.conversationList = list;
      });
      ChatService.getConversationList();
      
      ChatService.onNewMessage(() => {
        ChatService.getConversationList();
      });
    },

    initNotifications() {
      NotificationService.connect();
      NotificationService.getNotifications().then(list => {
        this.notifications = list;
      });
      NotificationService.onNotification((n) => {
        this.notifications.unshift(n);
      });
    },

    toggleMessages() {
      this.showMessages = !this.showMessages;
      if (this.showMessages) {
        this.showNotifications = false;
        ChatService.getConversationList();
      }
    },

    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      if (this.showNotifications) {
        this.showMessages = false;
        NotificationService.getNotifications().then(list => {
          this.notifications = list;
        });
      }
    },

    async markAllNotifsRead() {
      try {
        await NotificationService.markAllAsRead();
        this.notifications.forEach(n => n.isRead = true);
      } catch (err) {
        console.error('Failed to mark all as read:', err);
      }
    },

    async handleNotifClick(n) {
      this.showNotifications = false;
      
      if (!n.isRead) {
        try {
          await NotificationService.markAsRead(n.id);
          n.isRead = true;
        } catch (err) {
          console.error('Failed to mark notification as read:', err);
        }
      }

      if (n.relatedId) {
        this.$router.push({
          path: '/dashboard',
          query: { highlight: n.relatedId }
        });
      } else {
        this.$router.push('/dashboard');
      }
    },

    getNotifIcon(type) {
      switch(type) {
        case 'booking_requested': return 'calendar_add_on';
        case 'booking_accepted': return 'check_circle';
        case 'booking_declined': return 'cancel';
        case 'booking_cancelled': return 'block';
        default: return 'notifications';
      }
    },

    getNotifColor(type) {
      switch(type) {
        case 'booking_requested': return 'bg-blue-50 text-blue-600';
        case 'booking_accepted': return 'bg-green-50 text-green-600';
        case 'booking_declined': return 'bg-red-50 text-red-600';
        case 'booking_cancelled': return 'bg-amber-50 text-amber-600';
        default: return 'bg-slate-50 text-slate-600';
      }
    },

    handleOutsideClick(e) {
      const el = this.$refs.msgDropdown;
      if (el && !el.contains(e.target)) {
        this.showMessages = false;
      }
    },

    handleNotifOutsideClick(e) {
      const el = this.$refs.notifDropdown;
      if (el && !el.contains(e.target)) {
        this.showNotifications = false;
      }
    },

    handleMobileOutsideClick(e) {
      if (this.showMobileMenu && !this.$el.contains(e.target)) {
        this.showMobileMenu = false;
      }
    },

    navActive(path) {
      return this.$route.path === path;
    },
    navFill(path) {
      return { fontVariationSettings: this.$route.path === path ? "'FILL' 1" : "'FILL' 0" };
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
        localStorage.removeItem('user');
        ChatService.disconnect();
        NotificationService.disconnect();
        this.isLoggedIn = false;
        this.showMessages = false;
        this.showNotifications = false;
        window.location.href = '/login';
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
