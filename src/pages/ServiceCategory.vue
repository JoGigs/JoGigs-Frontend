<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen">
    <Header />
    <main class="max-w-4xl mx-auto px-6 py-16">

      <div class="mb-16 text-center">

        <h1 class="text-4xl font-bold text-primary dark:text-primary mb-3 capitalize">
          {{ category }}
        </h1>

      <p v-if="!loading" class="text-slate-400 font-medium">
        Browse {{ activeCount }} of {{ filteredServices.length }} {{ category }} services
      </p>
      </div>

      <div v-if="!loading" class="mb-8">
        <div class="flex items-center gap-2 max-w-lg mx-auto">
          <div class="relative flex-1">
            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <input
              v-model="searchQuery"
              class="w-full pl-12 pr-12 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-700 dark:text-slate-200 placeholder:text-slate-400 font-medium focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
              placeholder="Search by title, description, location, or professional name..."
              type="text"
            />
          </div>
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="flex items-center justify-center p-3 bg-red-50/80 hover:bg-red-100 text-red-600 dark:bg-red-950/30 dark:hover:bg-red-900/40 dark:text-red-400 rounded-2xl transition-all border border-red-100 dark:border-red-900/50"
            title="Clear search"
          >
            <span class="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-pulse text-primary font-bold uppercase tracking-widest">
          Loading...
        </div>
      </div>

      <div v-else-if="filteredServices.length > 0" class="space-y-4">
        <ServiceProCard
          v-for="service in filteredServices"
          :key="service.id"
          :serviceId="service.id"
          :title="service.title"
          :description="service.description"
          :rating="service.rating"
          :price="service.price"
          :location="service.location"
          :disabled="service.isDisabled"
        />
      </div>

      <div v-else class="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
        <span class="material-symbols-outlined text-4xl text-slate-300 mb-4">search_off</span>
        <p class="text-slate-500 font-bold">No {{ category }} pros found right now.</p>
      </div>

    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import { getAllServices } from "../services/serviceListing.service";
import ServiceProCard from "../components/ServiceProCard.vue";

export default {
  name: "ServiceCategory",
  components: { ServiceProCard, Header },

  data() {
    return {
      services: [],
      loading: true,
      searchQuery:'',
    };
  },

  computed: {
    category() {
      return this.$route.params.category;
    },
    activeCount() {
      return this.filteredServices.filter(s => !s.isDisabled).length;
    },
    filteredServices() {
      let result = this.services;
      if (this.category) {
        result = result.filter(s => s.category === this.category);
      }
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.trim().toLowerCase();
        result = result.filter(s => {
          const title = (s.title || '').toLowerCase();
          const desc = (s.description || '').toLowerCase();
          const name = (s.professional?.fullName || '').toLowerCase();
          const profLoc = (s.professional?.location || '').toLowerCase();
          const serviceLoc = (s.location || '').toLowerCase();
          return (
            title.includes(q) ||
            desc.includes(q) ||
            name.includes(q) ||
            profLoc.includes(q) ||
            serviceLoc.includes(q)
          );
        });
      }
      return result;
    }
  },

  async mounted() {
    try {
      this.services = await getAllServices();
    } catch (err) {
      console.error("Failed to load services", err);
    } finally {
      this.loading = false;
    }
  },
};
</script>
