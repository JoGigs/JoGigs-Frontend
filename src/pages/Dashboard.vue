<template>
  <div class="bg-surface-bright font-body-md text-on-surface min-h-screen">
    <Header />

    <main class="pt-32 pb-24 px-4 w-full max-w-5xl mx-auto">

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-32">
        <div class="flex flex-col items-center gap-4">
          <div class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p class="text-slate-500 font-medium">Loading your {{ isProfessional ? 'service management' : 'dashboard' }}...</p>
        </div>
      </div>

      <template v-else>
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 class="text-4xl font-extrabold text-on-surface mb-2">
                {{ isProfessional ? 'Service Management' : 'My Bookings' }}
              </h1>
              <p class="text-slate-500">
                {{ isProfessional
                  ? 'Manage your incoming requests, track service history, and offer new services.'
                  : 'Track your service requests and booking history.' }}
              </p>
            </div>
            <div v-if="isProfessional">
              <router-link to="/create-service"
                class="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-md shadow-primary/20">
                <span class="material-symbols-outlined">add_circle</span>
                Create New Service
              </router-link>
            </div>
          </div>

        <!-- ── My Services (Professional only) ── -->
        <section v-if="isProfessional" class="mb-12">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold">My Services</h2>
          </div>

          <div class="space-y-3">
            <div v-if="myServices.length === 0"
              class="bg-white p-8 rounded-xl border border-dashed border-slate-300 text-center text-slate-500">
              No services yet. Create your first service listing!
            </div>

            <div v-for="svc in myServices" :key="svc.id"
              class="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
              <!-- View mode -->
              <template v-if="editingServiceId !== svc.id">
                <div class="flex flex-col md:flex-row md:items-center gap-4">
                  <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-slate-900">{{ svc.title }}</h3>
                    <p class="text-sm text-slate-500 truncate">{{ svc.description }}</p>
                    <div class="flex items-center gap-3 mt-2">
                      <span class="text-sm font-bold text-primary">JOD {{ svc.price }}</span>
                      <span class="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{{ svc.category }}</span>
                      <span v-if="svc.location" class="text-[10px] text-slate-400 flex items-center gap-1">
                        <span class="material-symbols-outlined text-[12px]">location_on</span>{{ svc.location }}
                      </span>
                      <span class="flex items-center gap-1 text-sm text-amber-500">
                        <span class="material-symbols-outlined text-sm">star</span>
                        {{ svc.rating ? svc.rating.toFixed(1) : '—' }}
                      </span>
                    </div>
                  </div>
                  <div class="flex gap-2 flex-shrink-0">
                    <button @click="startEdit(svc)"
                      class="border border-slate-200 text-slate-600 px-4 py-2 rounded-lg font-bold text-[11px] uppercase tracking-wider hover:border-primary hover:text-primary transition-all active:scale-95">Edit</button>
                    <button @click="handleDeleteService(svc.id)"
                      class="border border-red-200 text-red-500 px-4 py-2 rounded-lg font-bold text-[11px] uppercase tracking-wider hover:bg-red-50 transition-all active:scale-95">Delete</button>
                  </div>
                </div>
              </template>
              <!-- Edit mode -->
              <template v-else>
                <div class="space-y-3">
                  <h3 class="px-1 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Editing: {{ svc.title }}</h3>
                  <textarea v-model="editForm.description" class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm resize-none" rows="2" placeholder="Description"></textarea>
                  <div class="flex gap-3">
                    <input v-model.number="editForm.price" type="number" min="0" step="0.5" class="w-32 px-3 py-2 rounded-lg border border-slate-200 text-sm" placeholder="Price" />
                    <input v-model="editForm.location" class="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm" placeholder="Location" />
                  </div>
                  <div class="flex gap-2">
                    <button @click="saveEdit(svc.id)"
                      class="bg-primary text-white px-4 py-2 rounded-lg font-bold text-[11px] uppercase tracking-wider hover:bg-primary-dark transition-all active:scale-95">Save</button>
                    <button @click="cancelEdit()"
                      class="border border-slate-200 text-slate-600 px-4 py-2 rounded-lg font-bold text-[11px] uppercase tracking-wider hover:border-red-500 hover:text-red-500 transition-all active:scale-95">Cancel</button>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </section>

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
                  class="bg-white p-6 rounded-2xl transition-all duration-500 shadow-sm border"
                  :class="[
                    highlightedId === gig.id 
                      ? 'border-amber-400 ring-4 ring-amber-400/20 scale-[1.02] shadow-xl z-10 animate-pulse' 
                      : (gig.status === 'accepted' ? 'border-blue-400 bg-blue-50/30' : 'border-slate-100 hover:border-primary/20')
                  ]">
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
                    <button @click="showUserDetail(gig.customer)"
                      class="flex-1 border border-slate-200 text-slate-600 font-bold text-[11px] py-3 rounded-lg hover:border-primary hover:text-primary transition-all active:scale-95 uppercase tracking-wider flex items-center justify-center gap-2">
                      <span class="material-symbols-outlined text-sm">visibility</span>
                      Profile
                    </button>
                    <router-link v-if="gig.customer?.id"
                      :to="{ name: 'ChatWindow', params: { id: gig.customer?.id }, query: { name: gig.customer?.fullName } }"
                      class="flex-1 border border-slate-200 text-slate-600 font-bold text-[11px] py-3 rounded-lg hover:border-primary hover:text-primary transition-all active:scale-95 uppercase tracking-wider flex items-center justify-center gap-2">
                      <span class="material-symbols-outlined text-sm">chat</span>
                      Contact
                    </router-link>
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
                  class="bg-white p-6 rounded-2xl transition-all duration-500 shadow-sm border"
                  :class="[
                    highlightedId === gig.id 
                      ? 'border-amber-400 ring-4 ring-amber-400/20 scale-[1.02] shadow-xl z-10 animate-pulse' 
                      : (gig.status === 'accepted' ? 'border-green-400 bg-green-50/30' : 'border-slate-100 hover:border-primary/20')
                  ]">
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

                  <div class="flex gap-3 mt-6">
                    <button @click="showUserDetail(gig.serviceListing?.professional)"
                      class="flex-1 border border-slate-200 text-slate-600 font-bold text-[11px] py-3 rounded-lg hover:border-primary hover:text-primary transition-all active:scale-95 uppercase tracking-wider flex items-center justify-center gap-2">
                      <span class="material-symbols-outlined text-sm">visibility</span>
                      Profile
                    </button>
                    <router-link v-if="gig.serviceListing"
                      :to="{ name: 'ChatWindow', params: { id: gig.serviceListing.professional?.id || gig.serviceListing.professionalId }, query: { name: gig.serviceListing.professional?.fullName || 'Professional' } }"
                      class="flex-1 border border-slate-200 text-slate-600 font-bold text-[11px] py-3 rounded-lg hover:border-primary hover:text-primary transition-all active:scale-95 uppercase tracking-wider flex items-center justify-center gap-2">
                      <span class="material-symbols-outlined text-sm">chat</span>
                      Contact
                    </router-link>
                    <button v-if="gig.status === 'pending' || gig.status === 'accepted'" @click="handleCancel(gig.id)"
                      class="flex-1 border border-red-100 text-red-600 font-bold text-[11px] py-3 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-all active:scale-95 uppercase tracking-wider">
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
                    <button v-if="!isProfessional && gig.status === 'completed' && gig.customerRating === null"
                      @click="openRateModal(gig.id)"
                      class="text-[10px] font-bold text-primary border border-primary/30 px-2 py-1 rounded-lg hover:bg-primary/5 transition-all">
                      Rate Experience
                    </button>
                    <span v-else-if="!isProfessional && gig.status === 'completed' && gig.customerRating !== null"
                      class="text-[10px] font-bold text-amber-500 flex items-center gap-1">
                      <span class="material-symbols-outlined text-[12px]">star</span>
                      {{ gig.customerRating }}/5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        <!-- Rate Modal -->
        <div v-if="showRateModal"
          class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          @click.self="showRateModal = false">
          <div class="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <h3 class="text-xl font-bold text-slate-900 mb-4">Rate Your Experience</h3>
            <div class="flex justify-center gap-2 mb-6">
              <button v-for="n in 5" :key="n"
                @click="rateValue = n"
                :class="['w-12 h-12 rounded-full text-2xl font-bold transition-all',
                  n <= rateValue ? 'bg-amber-400 text-white scale-110' : 'bg-slate-100 text-slate-400 hover:bg-slate-200']">
                {{ n }}
              </button>
            </div>
            <div class="flex gap-3">
              <button @click="showRateModal = false"
                class="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-bold text-sm">Cancel</button>
              <button @click="submitRate" :disabled="rateSubmitting"
                class="flex-1 bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-primary-dark transition-all disabled:opacity-50">
                {{ rateSubmitting ? 'Submitting...' : 'Submit Rating' }}
              </button>
            </div>
          </div>
        </div>

        <UserDetailModal :user="selectedUser" :isOpen="showProfileModal" @close="showProfileModal = false" />

      </template>
    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import UserDetailModal from '../components/UserDetailModal.vue';
import { getMyBookings, getMyJobs, respondToBooking, completeBooking, cancelBooking, rateBooking } from '../services/booking.service';
import { getMyServices, deleteService, updateService } from '../services/serviceListing.service';
import { getMyProfile } from '../services/profile.service';
import { onBookingUpdate } from '../services/notification.service';

export default {
  name: 'Dashboard',
  components: { Header, UserDetailModal },
  data() {
    let isPro = false;
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      isPro = user.type === 'professional';
    } catch (e) { /* ignore */ }

    return {
      isProfessional: isPro,
      activeGigs: [],
      historyGigs: [],
      myServices: [],
      loading: true,
      editingServiceId: null,
      editForm: { description: '', price: null, location: '' },
      showRateModal: false,
      rateBookingId: null,
      rateValue: 5,
      rateSubmitting: false,
      showProfileModal: false,
      selectedUser: null,
      highlightedId: null,
    };
  },
  async mounted() {
    await this.loadDashboardData();
    
    // Live update listener
    this.unsubscribe = onBookingUpdate((data) => {
      console.log('[Dashboard] Live update received for booking:', data?.bookingId);
      // Silent refresh: update data without showing the global spinner
      this.loadDashboardData(true);
    });
  },

  beforeUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  },

  watch: {
    '$route.query.highlight': {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.highlightedId = Number(newVal);
          setTimeout(() => { this.highlightedId = null; }, 5000);
        }
      }
    }
  },

  methods: {
    async loadDashboardData(silent = false) {
      if (!silent) this.loading = true;
      try {
        const profile = await getMyProfile();
        this.isProfessional = profile.type === 'professional';

        if (this.isProfessional) {
          const [jobs, services] = await Promise.all([getMyJobs(), getMyServices()]);
          this.activeGigs = jobs.filter(j => j.status === 'pending' || j.status === 'accepted');
          this.historyGigs = jobs.filter(j => j.status === 'completed' || j.status === 'declined');
          this.myServices = services;
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
        await this.loadDashboardData(true);
      } catch (err) {
        alert('Could not update booking.');
      }
    },

    async markDone(id) {
      try {
        await completeBooking(id);
        await this.loadDashboardData(true);
      } catch (err) {
        alert('Could not complete booking.');
      }
    },

    async handleDeleteService(id) {
      if (!confirm('Delete this service listing permanently?')) return;
      try {
        await deleteService(id);
        this.myServices = this.myServices.filter(s => s.id !== id);
      } catch (err) {
        alert('Could not delete service.');
      }
    },

    async handleCancel(id) {
      if (!confirm('Cancel this booking request?')) return;
      try {
        await cancelBooking(id);
        await this.loadDashboardData(true);
      } catch (err) {
        alert('Could not cancel booking.');
      }
    },

    startEdit(svc) {
      this.editingServiceId = svc.id;
      this.editForm = {
        description: svc.description,
        price: Number(svc.price),
        location: svc.location || '',
      };
    },

    cancelEdit() {
      this.editingServiceId = null;
    },

    async saveEdit(svcId) {
      try {
        const updated = await updateService(svcId, this.editForm);
        const idx = this.myServices.findIndex(s => s.id === svcId);
        if (idx !== -1) this.myServices[idx] = updated;
        this.editingServiceId = null;
      } catch (err) {
        alert('Could not update service.');
      }
    },

    openRateModal(bookingId) {
      this.rateBookingId = bookingId;
      this.rateValue = 5;
      this.showRateModal = true;
    },

    async submitRate() {
      if (!this.rateBookingId) return;
      this.rateSubmitting = true;
      try {
        await rateBooking(this.rateBookingId, this.rateValue);
        this.showRateModal = false;
        this.rateBookingId = null;
        await this.loadDashboardData(true);
      } catch (err) {
        alert('Could not submit rating.');
      } finally {
        this.rateSubmitting = false;
      }
    },

    showUserDetail(user) {
      console.log('showUserDetail called with:', user);
      if (!user) return;
      this.selectedUser = user;
      this.showProfileModal = true;
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