<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen">
    <Header />
    <main class="max-w-4xl mx-auto px-6 py-16">

      <!-- Header -->
      <div class="mb-16 text-center">
        <div
          class="flex justify-center items-center gap-2
                 text-[10px] text-slate-400 font-bold
                 mb-4 uppercase tracking-[0.2em]"
        >
          <span>Jordan</span>
          <span class="w-1 h-1 rounded-full bg-slate-300"></span>
          <span>Amman</span>
          <span class="w-1 h-1 rounded-full bg-slate-300"></span>
          <span class="text-primary capitalize">{{ category }}</span>
        </div>

        <h1 class="text-4xl font-bold text-slate-900 dark:text-white mb-3 capitalize">
          {{ category }} Professionals
        </h1>

        <p v-if="!loading" class="text-slate-400 font-medium">
          Showing {{ services.length }} verified experts in your area
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-pulse text-primary font-bold uppercase tracking-widest">
          Loading...
        </div>
      </div>

      <!-- Services -->
      <div v-else-if="services.length > 0" class="space-y-4">
        <ServiceProCard
          v-for="service in filteredServices"
          :key="service.id"
          :title="service.title"
          :description="service.description"
          :rating="service.rating"
         
        />
      </div>

      <!-- Empty state -->
      <div
        v-else
        class="text-center py-20 bg-white dark:bg-slate-900
               rounded-3xl border-2 border-dashed
               border-slate-200 dark:border-slate-800"
      >
        <span class="material-symbols-outlined text-4xl text-slate-300 mb-4">
          search_off
        </span>
        <p class="text-slate-500 font-bold">
          No {{ category }} pros found right now.
        </p>
      </div>

    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import { getAllServices } from "../api/serviceListing.api";
import ServiceProCard from "../components/ServiceProCard.vue";

export default {
  name: "ServiceCategory",
  components: { ServiceProCard,Header },

  data() {
    return {
      services: [],
      loading: true,
    };
  },

  computed: {
    category() {
      return this.$route.params.category;
    },
    filteredServices(){
      
      if(!this.category)return this.services;
      
      
      const serachTerm=this.category.toLocaleLowerCase().replace(/s$/,'');

      return this.services.filter(service=>{
        const title = service.title.toLocaleLowerCase();
        const description = service.description.toLocaleLowerCase();

        return title.includes(serachTerm)||description.includes(serachTerm);
      })


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
