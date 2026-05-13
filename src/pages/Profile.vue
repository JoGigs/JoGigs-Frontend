<template>
  <div class="bg-surface-bright font-body-md text-on-surface min-h-screen">
    <Header />

    <main class="pt-32 pb-24 px-4 w-full max-w-2xl mx-auto">
      <div v-if="loading" class="flex items-center justify-center py-32">
        <div class="flex flex-col items-center gap-4">
          <div class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p class="text-slate-500 font-medium">Loading profile...</p>
        </div>
      </div>

      <template v-else>
        <div class="mb-10">
          <h1 class="text-4xl font-extrabold text-on-surface mb-2">My Profile</h1>
          <p class="text-slate-500">Update your personal information and password.</p>
        </div>

        <div class="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
          <form @submit.prevent="handleUpdate" class="space-y-6">
            
            <div v-if="successMsg" class="bg-green-50 text-green-700 p-4 rounded-lg text-sm font-bold border border-green-200">
              {{ successMsg }}
            </div>
            
            <div v-if="errorMsg" class="bg-red-50 text-red-700 p-4 rounded-lg text-sm font-bold border border-red-200">
              {{ errorMsg }}
            </div>

            <div class="grid grid-cols-1 gap-6">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <input v-model="form.fullName" type="text"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
              </div>

              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                <input :value="profile.email" type="email" disabled
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed" />
                <p class="text-xs text-slate-400 mt-1">Email cannot be changed.</p>
              </div>

              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">Location</label>
                <input v-model="form.location" type="text" placeholder="e.g. Amman, Jordan"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
              </div>
 
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                <input v-model="form.phone" type="tel" placeholder="e.g. 079XXXXXXX"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
              </div>
            </div>

            <hr class="border-slate-100 my-8" />

            <h3 class="text-xl font-bold text-slate-800 mb-4">Change Password</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                <input v-model="form.currentPassword" type="password" placeholder="Leave blank to keep current"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                <input v-model="form.newPassword" type="password" placeholder="Leave blank to keep current"
                  class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
              </div>
            </div>

            <div class="pt-6">
              <button type="submit" :disabled="saving"
                class="w-full sm:w-auto bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-md shadow-primary/20 disabled:opacity-50">
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
