<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" @click.self="$emit('close')">
      <Transition name="scale">
        <div class="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
          <!-- Header/Cover -->
          <div class="h-32 bg-gradient-to-br from-primary to-primary-dark relative">
            <button @click="$emit('close')" class="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <!-- Avatar / Info -->
          <div class="px-8 pb-8 -mt-12 relative">
            <div class="inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-xl mb-6">
              <span class="material-symbols-outlined text-4xl text-primary">person</span>
            </div>

            <div class="mb-8">
              <h3 class="text-2xl font-black text-slate-900 mb-1">{{ user?.fullName }}</h3>
              <p class="text-sm font-bold text-primary uppercase tracking-widest">{{ user?.type }}</p>
            </div>

            <div class="space-y-6">
              <div class="flex items-center gap-4 group">
                <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                  <span class="material-symbols-outlined text-xl">call</span>
                </div>
                <div>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                  <p class="font-bold text-slate-700">{{ user?.phone || 'Not provided' }}</p>
                </div>
                <button v-if="user?.phone" @click="copyPhone" class="ml-auto text-primary hover:text-primary-dark p-2 transition-all">
                  <span class="material-symbols-outlined text-sm">{{ copied ? 'check' : 'content_copy' }}</span>
                </button>
              </div>

              <div class="flex items-center gap-4 group">
                <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all">
                  <span class="material-symbols-outlined text-xl">location_on</span>
                </div>
                <div>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
                  <p class="font-bold text-slate-700">{{ user?.location || 'Jordan' }}</p>
                </div>
              </div>
 
              <div v-if="user?.type === 'professional'" class="flex items-center gap-4 group">
                <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-amber-400 group-hover:bg-amber-50 transition-all">
                  <span class="material-symbols-outlined text-xl">star</span>
                </div>
                <div>
                  <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Overall Rating</p>
                  <p class="font-bold text-slate-700">{{ (overallRating !== null && overallRating > 0) ? overallRating.toFixed(1) + ' / 5.0' : 'New Provider' }}</p>
                </div>
              </div>
            </div>

            <div class="mt-10 flex gap-3">
              <router-link 
                :to="{ name: 'ChatWindow', params: { id: user?.id }, query: { name: user?.fullName } }"
                class="flex-1 bg-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 active:scale-95"
              >
                <span class="material-symbols-outlined text-sm">chat</span>
                Start Conversation
              </router-link>
              <button @click="$emit('close')" class="px-6 py-4 rounded-2xl border border-slate-100 font-bold text-slate-400 hover:bg-slate-50 transition-all">
                Close
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script>
import { getProfessionalRating } from '../services/profile.service';
 
export default {
  name: 'UserDetailModal',
  props: {
    user: Object,
    isOpen: Boolean
  },
  data() {
    return {
      copied: false,
      overallRating: null
    };
  },
  watch: {
    async isOpen(newVal) {
      if (newVal) {
        this.overallRating = null; // Reset
        if (this.user?.type === 'professional' && this.user?.id) {
          this.fetchRating();
        }
      }
    }
  },
  methods: {
    async copyPhone() {
      if (!this.user?.phone) return;
      try {
        await navigator.clipboard.writeText(this.user.phone);
        this.copied = true;
        setTimeout(() => this.copied = false, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    },
    async fetchRating() {
      try {
        const rating = await getProfessionalRating(this.user.id);
        console.log('Fetched Professional Rating:', rating);
        this.overallRating = rating;
      } catch (err) {
        console.error('Failed to fetch rating:', err);
        this.overallRating = null;
      }
    }
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.scale-enter-active, .scale-leave-active { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.scale-enter-from, .scale-leave-to { opacity: 0; transform: scale(0.9) translateY(20px); }
</style>
