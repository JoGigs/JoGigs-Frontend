<template>
  <div class="flex flex-col h-screen bg-slate-50 dark:bg-slate-900">
    <header class="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 p-4 sticky top-0 z-10">
      <div class="max-w-4xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button @click="$router.back()" class="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors lg:hidden">
            <span class="material-symbols-outlined text-slate-600 dark:text-slate-400">arrow_back</span>
          </button>
          <div class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
            {{ initials }}
          </div>
          <div>
            <h3 class="font-bold text-slate-900 dark:text-white leading-tight">{{ providerName }}</h3>
          </div>
        </div>
        <button @click="$router.back()"
          class="flex items-center gap-1 px-3 py-1.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all font-medium text-sm">
          <span class="material-symbols-outlined text-lg">logout</span>
          <span>Back</span>
        </button>
      </div>
    </header>

    <main ref="messageList" class="flex-1 overflow-y-auto p-4 space-y-4">
      <div class="max-w-4xl mx-auto space-y-4">
        <div v-if="isLoading" class="flex justify-center py-16">
          <div class="flex flex-col items-center gap-3 text-slate-400">
            <div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span class="text-xs font-medium tracking-widest uppercase">Loading messages…</span>
          </div>
        </div>

        <div v-else-if="messages.length === 0" class="flex justify-center py-16">
          <div class="text-center text-slate-400 space-y-2">
            <span class="material-symbols-outlined text-4xl">chat_bubble_outline</span>
            <p class="text-sm font-medium">No messages yet. Say hello!</p>
          </div>
        </div>

        <template v-else>
          <div v-for="(msg, index) in messages" :key="msg.id || index"
               :class="['flex w-full animate-fade-in', msg.fromMe ? 'justify-end' : 'justify-start']">
            <div :class="[
              'max-w-[80%] md:max-w-[60%] px-4 py-3 rounded-2xl shadow-sm relative',
              msg.failed
                ? 'bg-red-100 text-red-700 border border-red-200'
                : msg.fromMe
                  ? 'bg-primary text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-tl-none border border-slate-100 dark:border-slate-700'
            ]">
              <p class="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{{ msg.text }}</p>
              <div :class="['text-[10px] mt-1 flex items-center gap-1.5 opacity-80', msg.fromMe ? 'justify-end' : 'justify-start']">
                <span>{{ msg.time }}</span>
                <template v-if="msg.fromMe">
                  <span class="opacity-50 mx-0.5">•</span>
                  <span v-if="msg.failed" class="text-red-300 font-bold tracking-wide">Failed</span>
                  <span v-else-if="msg.pending" class="font-medium italic tracking-wide">Sending...</span>
                  <span v-else :class="['font-bold tracking-wide', msg.isRead ? 'text-blue-200' : 'text-white/80']">{{ msg.isRead ? 'Seen' : 'Sent' }}</span>
                </template>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>

    <footer class="bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 p-4">
      <div class="max-w-4xl mx-auto">
        <form @submit.prevent="sendMessage" class="flex items-end gap-2">
          <div class="flex-1 bg-slate-100 dark:bg-slate-700 rounded-2xl p-2 flex items-end">
            <textarea v-model="draft" rows="1"
              @keydown.enter.exact.prevent="sendMessage"
              placeholder="Type a message..."
              class="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white p-2 resize-none max-h-32"></textarea>
          </div>
          <button type="submit" :disabled="!draft.trim()"
            class="bg-primary hover:bg-primary-dark text-white p-3 rounded-2xl transition-all shadow-lg shadow-primary/20 disabled:opacity-50">
            <span class="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>
    </footer>
  </div>
</template>

<script>
import * as ChatService from '../services/chat.service';

export default {
  name: 'ChatWindow',

  data() {
    return {
      draft: '',
      messages: [],
      isLoading: true,
    };
  },

  computed: {
    receiverId() {
      return Number(this.$route.params.id);
    },
    providerName() {
      return this.$route.query.name || this.$route.params.name || 'User';
    },
    initials() {
      return this.providerName
        .split(' ')
        .map(w => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    },
  },

  methods: {
    getMyUserId() {
      try {
        return JSON.parse(localStorage.getItem('user') || '{}').id;
      } catch {
        return null;
      }
    },

    formatTime(isoString) {
      if (!isoString) return '';
      return new Date(isoString).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    },

    scrollToBottom(behavior = 'smooth') {
      this.$nextTick(() => {
        const list = this.$refs.messageList;
        if (list) list.scrollTo({ top: list.scrollHeight, behavior });
      });
    },

    sendMessage() {
      const text = this.draft.trim();
      if (!text) return;
      
      const myId = this.getMyUserId();
      const tempId = Date.now();
      
      // Optimistic update
      const tempMsg = {
        id: tempId,
        text,
        fromMe: true,
        time: this.formatTime(new Date()),
        pending: true
      };
      this.messages.push(tempMsg);
      this.draft = '';
      this.scrollToBottom();

      ChatService.sendMessage(this.receiverId, text);
    },
  },

  mounted() {
    // Re-use connection
    ChatService.connect();
    
    this.unsubs = [];

    // Initial fetch
    this.unsubs.push(ChatService.onConversationHistory((history) => {
      const myId = this.getMyUserId();
      this.messages = history.map(m => ({
        id: m.id,
        text: m.content,
        fromMe: m.senderId === myId,
        time: this.formatTime(m.createdAt),
        isRead: m.isRead
      }));
      this.isLoading = false;
      this.scrollToBottom('instant');
    }));

    ChatService.getConversation(this.receiverId);

    // Listen for incoming messages
    this.unsubs.push(ChatService.onNewMessage((msg) => {
      if (msg.senderId === this.receiverId) {
        this.messages.push({
          id: msg.id,
          text: msg.content,
          fromMe: false,
          time: this.formatTime(msg.createdAt),
          isRead: true // We are reading it right now
        });
        ChatService.markAsRead(this.receiverId);
        this.scrollToBottom();
      }
    }));

    // Listen for our own sent messages (confirmation)
    this.unsubs.push(ChatService.onMessageSent((msg) => {
      const idx = this.messages.findIndex(m => m.pending && m.text === msg.content);
      if (idx !== -1) {
        this.messages[idx].id = msg.id;
        this.messages[idx].pending = false;
        this.messages[idx].isRead = false;
        this.messages[idx].time = this.formatTime(msg.createdAt);
      }
    }));

    // Mark as read immediately on open
    ChatService.markAsRead(this.receiverId);

    // Listen for the other user reading our messages
    this.unsubs.push(ChatService.onMessagesRead((data) => {
      if (data.byUserId === this.receiverId) {
        this.messages.forEach(m => {
          if (m.fromMe) m.isRead = true;
        });
      }
    }));

    setTimeout(() => {
      if (this.isLoading) {
        this.isLoading = false;
        this.scrollToBottom('instant');
      }
    }, 3000);
  },

  beforeUnmount() {
    if (this.unsubs) {
      this.unsubs.forEach(unsub => unsub());
    }
  },
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
textarea { scrollbar-width: none; -ms-overflow-style: none; }
textarea::-webkit-scrollbar { display: none; }
</style>
