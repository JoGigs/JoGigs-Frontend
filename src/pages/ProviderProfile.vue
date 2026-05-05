<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen">
    <Header />

    <main class="pt-12 pb-24 px-6 md:px-12 max-w-5xl mx-auto">

      <!-- Hero / Identity Section -->
      <section class="mb-12">
        <div
          class="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 dark:border-slate-700 pb-12"
        >
          <div class="space-y-4">
            <div class="inline-flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full">
            </div>

            <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {{ provider.name }}
            </h1>

            <p class="text-lg text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">location_on</span>
              {{ provider.location }} • {{ provider.specialty }}
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <button
              @click="handleBooking"
              :disabled="isBooking || bookingStatus === 'success' || bookingStatus === 'already_booked'"
              :class="[
                'px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md',
                bookingStatus === 'success'
                  ? 'bg-green-600 text-white shadow-green-600/30 cursor-default'
                  : bookingStatus === 'already_booked'
                  ? 'bg-slate-400 text-white cursor-default'
                  : 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg shadow-primary/30'
              ]"
            >
              <span v-if="isBooking" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span v-else class="material-symbols-outlined text-sm">
                {{ bookingStatus === 'success' ? 'check_circle' : 'calendar_today' }}
              </span>
              {{ isBooking ? 'Booking…' : bookingStatus === 'success' ? 'Booked!' : 'Book Now' }}
            </button>
            <button
              @click="handleContact"
              :disabled="!professionalUserId"
              class="border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:border-primary hover:text-primary dark:hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="material-symbols-outlined text-sm">mail</span>
              Contact
            </button>
          </div>
        </div>
      </section>

      <!-- Booking notification banner -->
      <transition name="slide-down">
        <div
          v-if="bookingStatus"
          :class="[
            'mb-8 flex items-center justify-between gap-4 px-6 py-4 rounded-2xl border text-sm font-medium',
            bookingStatus === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300'
              : bookingStatus === 'already_booked'
              ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
          ]"
        >
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-xl">
              {{ bookingStatus === 'success' ? 'check_circle' : bookingStatus === 'already_booked' ? 'info' : 'error' }}
            </span>
            {{ bookingMessage }}
          </div>
          <button @click="dismissNotification" class="opacity-60 hover:opacity-100 transition-opacity">
            <span class="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      </transition>

      <!-- Main Content -->
      <div class="space-y-12">
        <!-- Bio Card -->
        <div class="bg-slate-50 dark:bg-slate-800 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-700">
          <h2 class="text-[10px] font-black tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-6">
            Expertise & Bio
          </h2>
          <p class="text-xl md:text-2xl leading-relaxed text-slate-700 dark:text-slate-200 font-medium">
            "{{ provider.bio }}"
          </p>
          <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-8">
            <p>{{ provider.detailedBio1 }}</p>
            <p>{{ provider.detailedBio2 }}</p>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import { getAllServices } from '../services/serviceListing.service';
import { createBooking } from '../services/booking.service';

export default {
  name: 'ProviderProfile',
  components: { Header },

  data() {
    return {
      isBooking: false,
      bookingStatus: null,
      bookingMessage: '',
      serviceListingId: null,
      professionalUserId: null,

      provider: {
        name: '',
        location: '',
        specialty: '',
        bio: '',
        detailedBio1: '',
        detailedBio2: '',
      },
    };
  },

  async mounted() {
    const id = Number(this.$route.params.id);
    this.serviceListingId = id;

    try {
      const services = await getAllServices();
      const match = services.find((s) => s.id === id);

      if (match) {
        const pro = match.professional || {};
        this.professionalUserId = pro.id || null;

        this.provider.name      = pro.fullName || pro.name || 'Provider';
        this.provider.location  = pro.location || 'Jordan';
        this.provider.specialty = match.title  || '';
        this.provider.bio       = match.description || '';
        this.provider.detailedBio1 = `Starting from JOD ${match.price ?? '—'} per visit.`;
        this.provider.detailedBio2 = `Rated ${match.rating ?? 'N/A'} / 5 on JoGigs. Fully licensed & insured.`;
      }
    } catch (err) {
      console.error('[ProviderProfile] Failed to load service:', err);
    }
  },

  methods: {
    async handleBooking() {
      if (this.isBooking || this.bookingStatus === 'success') return;

      this.isBooking      = true;
      this.bookingStatus  = null;
      this.bookingMessage = '';

      try {
        await createBooking(this.serviceListingId);
        this.bookingStatus  = 'success';
        this.bookingMessage = 'Booking request sent! The provider will confirm shortly.';
      } catch (err) {
        const status = err.response?.status;
        if (status === 409) {
          this.bookingStatus  = 'already_booked';
          this.bookingMessage = 'You already have a pending booking for this service.';
        } else if (status === 401) {
          this.$router.push('/login');
        } else {
          this.bookingStatus  = 'error';
          this.bookingMessage = 'Something went wrong. Please try again.';
        }
      } finally {
        this.isBooking = false;
      }
    },

    handleContact() {
      const chatId = this.professionalUserId || this.$route.params.id || '1';
      this.$router.push({
        name: 'ChatWindow',
        params: { id: chatId },
        query: { name: this.provider.name },
      });
    },

    dismissNotification() {
      this.bookingStatus  = null;
      this.bookingMessage = '';
    },
  },
};
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>