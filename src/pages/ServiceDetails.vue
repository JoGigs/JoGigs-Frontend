<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen">
    <Header />

    <main class="pt-12 pb-24 px-6 md:px-12 max-w-5xl mx-auto">

      <!-- Hero / Identity Section -->
      <section class="mb-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 dark:border-slate-700 pb-12">
          <div class="space-y-8">
            <!-- Provider Identity -->
            <div class="space-y-4">
              <p class="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {{ provider.name }}
              </p>
              <div class="flex flex-wrap items-center gap-4">
                <p class="text-lg text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary">location_on</span>
                  {{ provider.location || 'Location not specified' }}
                </p>
                  <p class="text-lg font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">call</span>
                    {{ provider.phone || 'N/A' }}
                  </p>
                  <button
                    v-if="provider.phone && provider.phone !== 'No phone provided' && provider.phone !== 'Phone not available'"
                    @click="copyPhone"
                    class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-primary flex items-center gap-1 active:scale-90"
                    :title="copySuccess ? 'Copied!' : 'Copy phone number'"
                  >
                    <span class="material-symbols-outlined text-sm">
                      {{ copySuccess ? 'check' : 'content_copy' }}
                    </span>
                    <span v-if="copySuccess" class="text-[10px] uppercase tracking-wider font-bold">Copied</span>
                  </button>
              </div>
            </div>

            <div class="h-px bg-slate-200 dark:bg-slate-700 w-full max-w-md"></div>

            <!-- Service & Contact Info -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div class="space-y-3">
                <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Info</p>
                <p v-if="provider.serviceLocation" class="text-lg text-slate-700 dark:text-slate-200 flex items-center gap-2 font-semibold">
                  <span class="material-symbols-outlined text-primary">near_me</span>
                  {{ 'Covers ' + provider.serviceLocation }}
                </p>
                <div v-if="provider.price" class="flex items-center gap-2 text-primary font-bold text-2xl">
                  <span class="material-symbols-outlined">payments</span>
                  <span>JOD {{ provider.price }}</span>
                </div>
              </div>

              <div class="space-y-3">
                <p class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Service Rating</p>
                <div class="flex items-center gap-2">
                  <div v-if="provider.rating" class="flex items-center gap-1.5 text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-xl border border-amber-100 dark:border-amber-900/50 shadow-sm">
                  <span class="material-symbols-outlined text-lg fill-1">star</span>
                  <span class="font-bold text-sm">{{ provider.rating }}</span>
                </div>
                  
                  
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <button
              @click="handleBooking"
              :disabled="isBooking || bookingStatus === 'success'"
              :class="[
                'px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md',
                bookingStatus === 'success'
                  ? 'bg-green-600 text-white shadow-green-600/30 cursor-default'
                  : 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg shadow-primary/30'
              ]"
            >
              <span v-if="isBooking" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span v-else class="material-symbols-outlined text-sm">{{ bookingStatus === 'success' ? 'check_circle' : 'calendar_today' }}</span>
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
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
          ]"
        >
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-xl">{{ bookingStatus === 'success' ? 'check_circle' : 'error' }}</span>
            {{ bookingMessage }}
          </div>
          <button @click="dismissNotification" class="opacity-60 hover:opacity-100 transition-opacity">
            <span class="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      </transition>

      <!-- Service Description -->
      <div class="space-y-12">
        <div class="bg-slate-50 dark:bg-slate-800 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-700">
          <h2 class="text-[10px] font-black tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-6">
            About This Service
          </h2>
          <p class="text-xl md:text-2xl leading-relaxed text-slate-700 dark:text-slate-200 font-medium">
            {{ provider.bio }}
          </p>
        </div>
      </div>

    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import { getAllServices } from '../services/serviceListing.service';
import { createBooking, getMyBookings } from '../services/booking.service';

export default {
  name: 'ServiceDetails',
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
        serviceLocation: '',
        specialty: '',
        bio: '',
        price: null,
        rating: null,
        phone: '',
      },
      copySuccess: false,
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

        this.provider.name           = pro.fullName || pro.name || 'Provider';
        this.provider.location       = pro.location || '';
        this.provider.serviceLocation = match.location || '';
        this.provider.specialty      = match.title  || '';
        this.provider.bio            = match.description || '';
        this.provider.price          = match.price || '—';
        this.provider.rating         = match.rating || 0;
        this.provider.phone          = pro.phone || 'No phone provided';
      }

      // Check if user already has an active booking for this service
      if (localStorage.getItem('loggedIn')) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.type !== 'professional') {
          try {
            const bookings = await getMyBookings();
            const activeBooking = bookings.find(b => b.serviceListing?.id === id && (b.status === 'pending' || b.status === 'accepted'));
            
            if (activeBooking) {
              this.bookingStatus = 'success';
              this.bookingMessage = 'You already have an active request for this service.';
            }
          } catch (e) {
            console.error('Failed to load existing bookings', e);
          }
        }
      }
    } catch (err) {
      console.error('[ServiceDetails] Failed to load service:', err);
    }
  },
 
  methods: {
    async copyPhone() {
      if (!this.provider.phone) return;
      try {
        await navigator.clipboard.writeText(this.provider.phone);
        this.copySuccess = true;
        setTimeout(() => {
          this.copySuccess = false;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    },
 
    async handleBooking() {
      if (!localStorage.getItem('loggedIn')) {
        return this.$router.push('/login');
      }

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
        if (status === 401) {
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
      if (!localStorage.getItem('loggedIn')) {
        return this.$router.push('/login');
      }

      if (!this.professionalUserId) return;
      this.$router.push({
        name: 'ChatWindow',
        params: { id: this.professionalUserId },
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
