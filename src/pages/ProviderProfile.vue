<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen">
    <Header />

    <main class="pt-12 pb-24 px-6 md:px-12 max-w-7xl mx-auto">

      <!-- Hero / Identity Section -->
      <section class="mb-16">
        <div
          class="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 dark:border-slate-700 pb-12"
        >
          <div class="space-y-4">
            <div class="inline-flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full">
              <span class="material-symbols-outlined text-[14px] text-green-600">verified</span>
              <span class="text-[10px] font-black tracking-wider uppercase text-green-600">Verified Provider</span>
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

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <!-- Left Column -->
        <div class="lg:col-span-8 space-y-12">

          <!-- Bio Card -->
          <div class="bg-slate-50 dark:bg-slate-800 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-700">
            <h2 class="text-[10px] font-black tracking-widest uppercase text-slate-500 dark:text-slate-400 mb-6">
              Expertise & Bio
            </h2>
            <p class="text-xl md:text-2xl leading-relaxed text-slate-700 dark:text-slate-200 font-medium">
              "{{ provider.bio }}"
            </p>
            <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-500 dark:text-slate-400">
              <p>{{ provider.detailedBio1 }}</p>
              <p>{{ provider.detailedBio2 }}</p>
            </div>
          </div>

          <!-- Project Gallery -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="(project, index) in provider.projects"
              :key="index"
              class="relative h-64 rounded-3xl overflow-hidden group cursor-pointer"
            >
              <div
                class="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/50 transition-colors duration-300 z-10"
              ></div>
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute bottom-6 left-6 text-white z-20">
                <span class="text-[9px] font-bold tracking-widest uppercase opacity-80">{{ project.tag }}</span>
                <h3 class="text-lg font-bold">{{ project.title }}</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Sidebar -->
        <aside class="lg:col-span-4 space-y-8">

          <!-- Core Services Card -->
          <div
            class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-3xl shadow-sm"
          >
            <h2 class="text-[10px] font-black tracking-widest uppercase text-primary mb-8">Core Services</h2>
            <ul class="space-y-6">
              <li v-for="service in provider.services" :key="service.title" class="flex items-start gap-4">
                <div
                  class="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0"
                >
                  <span class="material-symbols-outlined text-primary">{{ service.icon }}</span>
                </div>
                <div>
                  <h4 class="font-bold text-slate-900 dark:text-white">{{ service.title }}</h4>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">{{ service.desc }}</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Stats Card -->
          <div class="bg-slate-900 dark:bg-slate-950 text-white p-8 rounded-3xl border border-slate-700">
            <h2 class="text-[10px] font-black tracking-widest uppercase text-primary mb-8">Provider Stats</h2>
            <div class="grid grid-cols-2 gap-8">
              <div v-for="stat in provider.stats" :key="stat.label">
                <span class="block text-3xl font-extrabold text-white">{{ stat.value }}</span>
                <span class="text-[10px] font-medium tracking-widest uppercase text-slate-400">{{ stat.label }}</span>
              </div>
            </div>
          </div>
        </aside>
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
      // ── Booking state ────────────────────────────────────────────────────
      isBooking: false,
      bookingStatus: null, // null | 'success' | 'error' | 'already_booked'
      bookingMessage: '',

      // ── Service / provider data ──────────────────────────────────────────
      serviceListingId: null,  // set from route + API
      professionalUserId: null, // for the chat button

      provider: {
        name: '',
        location: '',
        specialty: '',
        bio: '',
        detailedBio1: '',
        detailedBio2: '',
        services: [],
        stats: [
          { label: 'Years Exp.', value: '—' },
          { label: 'On-Time',   value: '—' },
          { label: 'Gigs Done', value: '—' },
          { label: 'Response',  value: '—' },
        ],
        projects: [
          {
            title: 'Industrial Grade Pipe Layout',
            tag: 'Latest Work',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3OO5c6OCYneiveN4wHvzZph4YaNa9tAJjb8QrO8D6N1GDSnOk3IdWfIF6TBCGaLJbbiekH_CygPwavCfXDCo6LM2u5L-Y04cu6Gg1_4uuL9-p35zJr0lKVLCa7Srumcea_TPE1JmPVG9UXHZ5PyCu3ad16p389zynAohFlRqnr9df9DPlFua9Vrxz46gwFTfSOKDajrYSMhskbzXHQe7Y4qUtDosSLNZLWLDsfOfka4XGpptbRXCr6oAdU1lJh1QBVnGePhqbWK6r',
          },
          {
            title: 'Smart Home Faucet Retrofit',
            tag: 'Maintenance',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMHrD_e8Q6huss7crajYEIQg0uSpDTLj88V_fN_VmRIEBPxsEg9MIkwe2hr7hGbd2lXGTIIxPWEY6rgbb7do2p8NgmiSWy0_KRbpBLyG82Dp9GnfSWKzM6ed-sHgRQChb-mo1zvE-sDgjuseaZus4e7YPFVck9gQLjV4QSMX0qzjgyCYXSEz1Rf3wDZxT-J4JGTN2DyGojCXZ904pVGIKx6hK37lVepa6AcYZIjMwgs9mC0s5k2ufLxW68hamJwVOBIIrj5lUXHQBa',
          },
        ],
      },
    };
  },

  async mounted() {
    // The route param is the serviceListingId: /provider/:id
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

        // Fill services sidebar with the single listing
        this.provider.services = [
          { title: match.title, desc: match.description, icon: 'handyman' },
        ];

        // Real stats if backend eventually returns them
        if (pro.gigsCompleted != null) {
          this.provider.stats = [
            { label: 'Years Exp.', value: pro.yearsExp    ? `${pro.yearsExp}+` : '—' },
            { label: 'On-Time',   value: pro.onTimeRate   ? `${pro.onTimeRate}%` : '—' },
            { label: 'Gigs Done', value: `${pro.gigsCompleted}+` },
            { label: 'Response',  value: pro.responseTime || '—' },
          ];
        }
      }
    } catch (err) {
      console.error('[ProviderProfile] Failed to load service:', err);
    }
  },

  methods: {
    // ── Book Now ───────────────────────────────────────────────────────────
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

    // ── Contact (Chat) ─────────────────────────────────────────────────────
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

