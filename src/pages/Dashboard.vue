<template>
  <div class="bg-surface-bright font-body-md text-on-surface min-h-screen">
    <Header />

    <main class="pt-32 pb-24 px-4 w-full max-w-5xl mx-auto">

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-32">
        <div class="flex flex-col items-center gap-4">
          <div class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p class="text-slate-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>

      <template v-else>
        <div class="mb-10">
          <h1 class="text-4xl font-extrabold text-on-surface mb-2">
            {{ isProfessional ? 'Service Dashboard' : 'My Bookings' }}
          </h1>
          <p class="text-slate-500">
            {{ isProfessional
              ? 'Manage your incoming requests and track your service history.'
              : 'Track your service requests and booking history.' }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          <!-- ── Left Column: Active ── -->
          <section class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold">Active Requests</h2>
              <span v-if="activeGigs.length > 0"
                class="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full">
                {{ activeGigs.length }} TOTAL
              </span>
            </div>

            <div class="space-y-4">
              <div v-if="activeGigs.length === 0"
                class="bg-white p-8 rounded-xl border border-dashed border-slate-300 text-center text-slate-500">
                No active requests.
              </div>

              <!-- PROFESSIONAL cards -->
              <template v-if="isProfessional">
                <div v-for="gig in activeGigs" :key="gig.id"
                  :class="['bg-white p-6 rounded-xl border transition-all shadow-sm',
                    gig.status === 'accepted' ? 'border-blue-400 bg-blue-50/30' : 'border-slate-100']">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <div class="flex items-center gap-2 mb-1">
                        <h3 class="font-bold text-lg">{{ gig.customer?.fullName || 'Customer' }}</h3>
                        <span v-if="gig.status === 'accepted'"
                          class="bg-blue-100 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase">In Progress</span>
                        <span v-else
                          class="bg-amber-100 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase">Pending</span>
                      </div>
                      <p class="text-slate-500 text-sm">{{ gig.serviceListing?.title || '—' }}</p>
                    </div>
                    <span class="text-slate-400 text-[10px] font-bold uppercase">{{ formatDate(gig.createdAt) }}</span>
                  </div>

                  <div class="flex gap-3 mt-6">
                    <template v-if="gig.status === 'pending'">
                      <button @click="respondToJob(gig.id, 'accepted')"
                        class="flex-1 bg-green-600 text-white font-bold text-[11px] py-3 rounded-lg uppercase tracking-wider hover:bg-green-700 transition-all active:scale-95">
                        Accept
                      </button>
                      <button @click="respondToJob(gig.id, 'declined')"
                        class="flex-1 border border-slate-200 text-slate-600 font-bold text-[11px] py-3 rounded-lg hover:border-red-500 hover:text-red-500 transition-all active:scale-95 uppercase tracking-wider">
                        Decline
                      </button>
                    </template>
                    <template v-else-if="gig.status === 'accepted'">
                      <button @click="markDone(gig.id)"
                        class="flex-1 bg-blue-600 text-white font-bold text-[11px] py-3 rounded-lg uppercase tracking-wider hover:bg-blue-700 transition-all active:scale-95">
                        Mark as Done
                      </button>
                    </template>
                  </div>
                </div>
              </template>

              <!-- CUSTOMER cards -->
              <template v-else>
                <div v-for="gig in activeGigs" :key="gig.id"
                  :class="['bg-white p-6 rounded-xl border transition-all shadow-sm',
                    gig.status === 'accepted' ? 'border-green-400 bg-green-50/30' : 'border-slate-100']">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <div class="flex items-center gap-2 mb-1">
                        <h3 class="font-bold text-lg">{{ gig.serviceListing?.title || 'Service' }}</h3>
                        <span v-if="gig.status === 'accepted'"
                          class="bg-green-100 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase">Accepted</span>
                        <span v-else
                          class="bg-amber-100 text-amber-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase">Pending</span>
                      </div>
                      <p class="text-slate-500 text-sm">
                        By <span class="font-semibold">{{ gig.serviceListing?.professional?.fullName || 'Professional' }}</span>
                      </p>
                    </div>
                    <span class="text-slate-400 text-[10px] font-bold uppercase">{{ formatDate(gig.createdAt) }}</span>
                  </div>

                  <div v-if="gig.status === 'pending'" class="flex gap-3 mt-6">
                    <button @click="handleCancel(gig.id)"
                      class="flex-1 border border-slate-200 text-slate-600 font-bold text-[11px] py-3 rounded-lg hover:border-red-500 hover:text-red-500 transition-all active:scale-95 uppercase tracking-wider">
                      Cancel
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </section>

          <!-- ── Right Column: History ── -->
          <section class="space-y-6">
            <h2 class="text-2xl font-bold">History</h2>

            <div class="space-y-3">
              <div v-if="historyGigs.length === 0"
                class="bg-white p-8 rounded-xl border border-dashed border-slate-300 text-center text-slate-500">
                No history yet.
              </div>

              <div v-for="gig in historyGigs" :key="gig.id"
                class="bg-white/50 border border-slate-100 p-4 rounded-xl">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <div :class="['h-10 w-10 rounded-lg flex items-center justify-center',
                      gig.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-400']">
                      <span class="material-symbols-outlined">
                        {{ gig.status === 'completed' ? 'task_alt' : 'cancel' }}
                      </span>
                    </div>
                    <div>
                      <template v-if="isProfessional">
                        <h4 class="font-bold text-sm">{{ gig.customer?.fullName || 'Customer' }}</h4>
                        <p class="text-slate-400 text-[11px]">{{ gig.serviceListing?.title }}</p>
                      </template>
                      <template v-else>
                        <h4 class="font-bold text-sm">{{ gig.serviceListing?.title || 'Service' }}</h4>
                        <p class="text-slate-400 text-[11px]">By {{ gig.serviceListing?.professional?.fullName || 'Professional' }}</p>
                      </template>
                      <p class="text-slate-500 text-[11px] uppercase font-bold mt-0.5">{{ gig.status }}</p>
                    </div>
                  </div>

                  <div class="flex flex-col items-end gap-2">
                    <span class="text-slate-400 text-[10px] font-medium">{{ formatDate(gig.createdAt) }}</span>
                    <button v-if="!isProfessional && gig.status === 'completed'"
                      class="text-[10px] font-bold text-primary border border-primary/30 px-2 py-1 rounded-lg hover:bg-primary/5 transition-all">
                      Rate Experience
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </template>
    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import { getMyBookings, getMyJobs, respondToBooking, completeBooking } from '../services/booking.service';
import { getMyProfile } from '../services/profile.service';

export default {
  name: 'Dashboard',
  components: { Header },
  data() {
    return {
      isProfessional: false,
      activeGigs: [],
      historyGigs: [],
      loading: true,
    };
  },
  async mounted() {
    await this.loadDashboardData();
  },
  methods: {
    async loadDashboardData() {
      try {
        const profile = await getMyProfile();
        this.isProfessional = profile.role === 'professional';

        if (this.isProfessional) {
          const jobs = await getMyJobs();
          this.activeGigs = jobs.filter(j => j.status === 'pending' || j.status === 'accepted');
          this.historyGigs = jobs.filter(j => j.status === 'completed' || j.status === 'declined');
        } else {
          const bookings = await getMyBookings();
          this.activeGigs = bookings.filter(b => b.status === 'pending' || b.status === 'accepted');
          this.historyGigs = bookings.filter(b => b.status === 'completed' || b.status === 'declined');
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        this.loading = false;
      }
    },

    async respondToJob(id, status) {
      try {
        await respondToBooking(id, status);
        await this.loadDashboardData();
      } catch (err) {
        alert('Could not update booking.');
      }
    },

    async markDone(id) {
      try {
        await completeBooking(id);
        await this.loadDashboardData();
      } catch (err) {
        alert('Could not complete booking.');
      }
    },

    async handleCancel(id) {
      if (!confirm('Are you sure you want to cancel this booking?')) return;
      // TODO: call DELETE /bookings/:id or PATCH /bookings/:id/cancel when available
      alert('Cancellation request sent.');
      await this.loadDashboardData();
    },

    formatDate(dateStr) {
      if (!dateStr) return '';
      return new Date(dateStr).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
      });
    },
  },
};
</script>