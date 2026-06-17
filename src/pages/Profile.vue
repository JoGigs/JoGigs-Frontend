<template>
  <div class="bg-slate-50 min-h-screen">
    <Header />

    <main class="pt-28 pb-24 px-4 w-full max-w-3xl mx-auto">
      <div v-if="loading" class="flex items-center justify-center py-32">
        <div class="flex flex-col items-center gap-4">
          <div class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p class="text-slate-500 font-medium">Loading profile...</p>
        </div>
      </div>

      <template v-else>
        <!-- Profile Header Card -->
        <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-8">
          <div class="h-32 bg-gradient-to-r from-primary/80 via-primary to-primary/70"></div>
          <div class="px-8 pb-8">
            <div class="flex flex-col sm:flex-row sm:items-end gap-6 -mt-14">
              <div class="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-white flex items-center justify-center font-extrabold text-4xl shadow-xl shadow-primary/30 ring-4 ring-white">
                {{ userInitial }}
              </div>
              <div class="sm:pb-2 flex-1">
                <h1 class="text-2xl font-extrabold text-slate-900">{{ profile.fullName || 'User' }}</h1>
                <div class="flex items-center gap-3 mt-1">
                  <span class="flex items-center gap-1.5 text-sm text-slate-500">
                    <span class="material-symbols-outlined text-sm">mail</span>
                    {{ profile.email }}
                  </span>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
                    :class="profile.type === 'professional' ? 'bg-primary/10 text-primary' : 'bg-amber-50 text-amber-600'">
                    {{ profile.type === 'professional' ? 'Professional' : 'Customer' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Form Card -->
        <div class="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <form @submit.prevent="handleUpdate">

            <div v-if="successMsg" class="mb-6 flex items-center gap-3 bg-green-50 text-green-700 px-5 py-4 rounded-2xl text-sm font-bold border border-green-200">
              <span class="material-symbols-outlined text-lg">check_circle</span>
              {{ successMsg }}
            </div>
            
            <div v-if="errorMsg" class="mb-6 flex items-center gap-3 bg-red-50 text-red-700 px-5 py-4 rounded-2xl text-sm font-bold border border-red-200">
              <span class="material-symbols-outlined text-lg">error</span>
              {{ errorMsg }}
            </div>

            <!-- Personal Information -->
            <div class="mb-10">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span class="material-symbols-outlined text-primary">person</span>
                </div>
                <div>
                  <h2 class="text-lg font-extrabold text-slate-900">Personal Information</h2>
                  <p class="text-sm text-slate-400">Update your public profile details</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <div class="relative">
                    <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">badge</span>
                    <input v-model="form.fullName" type="text"
                      class="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all text-sm" />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-bold text-slate-700 mb-2">Location</label>
                  <div class="relative">
                    <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">location_on</span>
                    <input v-model="form.location" type="text" placeholder="e.g. Amman, Jordan"
                      class="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all text-sm" />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                  <div class="relative">
                    <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">call</span>
                    <input v-model="form.phone" type="tel" placeholder="e.g. 079XXXXXXX"
                      class="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all text-sm" />
                  </div>
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <div class="relative">
                    <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">mail</span>
                    <input :value="profile.email" type="email" disabled
                      class="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed text-sm" />
                  </div>
                  <p class="text-xs text-slate-400 mt-1.5 ml-1">Email cannot be changed.</p>
                </div>
              </div>
            </div>

            <!-- Divider -->
            <div class="flex items-center gap-4 mb-10">
              <div class="h-px bg-slate-100 flex-1"></div>
              <span class="material-symbols-outlined text-slate-300">lock</span>
              <div class="h-px bg-slate-100 flex-1"></div>
            </div>

            <!-- Change Password -->
            <div class="mb-8">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <span class="material-symbols-outlined text-amber-500">key</span>
                </div>
                <div>
                  <h2 class="text-lg font-extrabold text-slate-900">Change Password</h2>
                  <p class="text-sm text-slate-400">Leave blank to keep your current password</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                  <div class="relative">
                    <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock</span>
                    <input v-model="form.currentPassword" type="password" placeholder="Enter current password"
                      class="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all text-sm" />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                  <div class="relative">
                    <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock_open</span>
                    <input v-model="form.newPassword" type="password" placeholder="Enter new password"
                      class="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all text-sm" />
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Submit -->
            <div class="flex items-center justify-between pt-2 border-t border-slate-100">
              <button type="submit" :disabled="saving"
                class="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-2xl font-extrabold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 active:scale-[0.98]">
                <span v-if="saving" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span v-else class="material-symbols-outlined text-lg">save</span>
                {{ saving ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </template>
    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import { getMyProfile, updateProfile } from '../services/profile.service';

export default {
  name: 'Profile',
  components: { Header },
  computed: {
    userInitial() {
      const name = this.profile?.fullName || '';
      if (!name) return '?';
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
      return name.charAt(0).toUpperCase();
    }
  },
  data() {
    return {
      loading: true,
      saving: false,
      profile: null,
      form: {
        fullName: '',
        location: '',
        phone: '',
        currentPassword: '',
        newPassword: ''
      },
      successMsg: '',
      errorMsg: ''
    };
  },
  async mounted() {
    try {
      this.profile = await getMyProfile();
      this.form.fullName = this.profile.fullName || '';
      this.form.location = this.profile.location || '';
      this.form.phone = this.profile.phone || '';
    } catch (err) {
      console.error('Failed to load profile:', err);
      this.errorMsg = 'Could not load profile. Please try again.';
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async handleUpdate() {
      this.successMsg = '';
      this.errorMsg = '';
      this.saving = true;

      try {
        const payload = {
          fullName: this.form.fullName,
          location: this.form.location,
          phone: this.form.phone
        };

        if (this.form.currentPassword || this.form.newPassword) {
          payload.currentPassword = this.form.currentPassword;
          payload.newPassword = this.form.newPassword;
        }

        const updatedProfile = await updateProfile(payload);
        this.profile = updatedProfile;
        
        // Update local storage user just in case name changed (for chat UI, etc)
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({ ...storedUser, ...updatedProfile }));

        this.successMsg = 'Profile updated successfully!';
        this.form.currentPassword = '';
        this.form.newPassword = '';
      } catch (err) {
        this.errorMsg = err.response?.data?.message || 'Failed to update profile. Please check your inputs.';
      } finally {
        this.saving = false;
      }
    }
  }
};
</script>
