<template>
  <div
    class="bg-white dark:bg-slate-900 rounded-2xl p-8
           border border-slate-100 dark:border-slate-800
           hover:border-primary/20 transition-all duration-300
           flex flex-col md:flex-row gap-8 items-start md:items-center
           shadow-sm hover:shadow-md mb-4"
  >
    <div class="flex-1">
      <!-- Title + badge -->
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

      <!-- Description -->
      <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">
        {{ description }}
      </p>
    </div>

    <!-- CTA -->
    <div class="w-full md:w-auto">
      <button
        class="border border-slate-200 dark:border-slate-700
               text-slate-600 dark:text-slate-300
               px-6 py-2.5 rounded-xl font-bold text-sm
               hover:border-primary hover:text-primary
               transition-all whitespace-nowrap w-full"
        @click="viewProfile"
      >
        View Profile
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServiceProCard",
  props: {
    title: String,
    description: String,
    professionalId: Number, 
  },
  methods: {
    viewProfile() {
      this.$router.push(`/profile/${this.professionalId}`);
    },
  },
};
</script>
