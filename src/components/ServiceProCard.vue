<template>
  <div
    class="bg-white dark:bg-slate-900 rounded-2xl p-8
           border border-slate-100 dark:border-slate-800
           hover:border-primary/20 transition-all duration-300
           flex flex-col md:flex-row gap-8 items-start md:items-center
           shadow-sm hover:shadow-md mb-4"
  >
    <div class="flex-1">
      <div class="flex flex-wrap items-center gap-3 mb-3">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">
          {{ title }}
        </h3>

        <span
          class="bg-emerald-50 dark:bg-emerald-900/20
                 text-emerald-600 dark:text-emerald-400
                 text-[9px] font-black px-2 py-0.5 rounded
                 uppercase tracking-wider border
                 border-emerald-100 dark:border-emerald-800/50"
        >
          Verified
        </span>
      </div>

      <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-2xl mb-4">
        {{ description }}
      </p>

      <div v-if="price" class="flex items-center gap-1 text-primary">
        <span class="text-[10px] font-bold uppercase tracking-tight">Starting from</span>
        <span class="font-black text-lg">JOD {{ price }}</span>
      </div>
    </div>

    <div class="w-full md:w-auto flex-shrink-0">
      <button
        @click="viewProfile"
        class="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm
               hover:bg-primary-dark shadow-md shadow-primary/20
               transition-all active:scale-95 whitespace-nowrap w-full
               flex items-center justify-center gap-2"
      >
        <span class="material-symbols-outlined text-[18px]">visibility</span>
        View Profile
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServiceProCard",
  props: {
    title:       { type: String, required: true },
    description: { type: String, default: '' },
    rating:      { type: Number, default: 0 },
    price:       { type: Number, default: 0 },
    serviceId:   { type: Number, required: true }, 
  },
  methods: {
    viewProfile() {
      this.$router.push(`/provider/${this.serviceId}`);
    },
  },
};
</script>