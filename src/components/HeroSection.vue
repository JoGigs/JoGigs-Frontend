<template>
    <section class="relative py-12 mb-16 overflow-hidden rounded-3xl bg-emerald-50 dark:bg-emerald-950/20 px-8">
        <div class="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 blob-shape"></div>
        <div class="absolute -bottom-12 -left-12 w-48 h-48 bg-accent/20 blob-shape"></div>
        <div class="relative z-10 text-center max-w-3xl mx-auto">
            <span
                class="inline-block px-4 py-1.5 bg-white dark:bg-slate-800 rounded-full text-xs font-bold text-primary shadow-sm mb-6">
                🎯 BOOK A LOCAL PRO IN 2 MINUTES
            </span>
            <h2 class="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-[1.1]">
                Need a hand?
                <br />
                <span class="relative">
                    We got you covered
                    <svg class="absolute -bottom-2 left-0 w-full" height="8" preserveAspectRatio="none"
                        viewBox="0 0 100 8">
                        <path d="M0 5C20 2 40 2 60 5C80 8 100 5 100 5" fill="transparent" stroke="#22c55e"
                            stroke-linecap="round" stroke-width="4"></path>
                    </svg>
                </span>
            </h2>
            <p class="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto">
                From plumbing to painting, find verified local professionals in your neighborhood. Quality service, fair
                prices.
            </p>

            <!-- Search Bar -->
            <div class="relative max-w-2xl mx-auto">
                <div
                    class="flex flex-col md:flex-row items-center bg-white dark:bg-slate-800 p-2 rounded-2xl md:rounded-full shadow-2xl shadow-emerald-900/10 border border-emerald-100 dark:border-slate-700">
                    <div class="flex-1 flex items-center w-full px-4 py-3 md:py-0">
                        <span class="material-symbols-outlined text-slate-400 mr-3">search</span>
                        <input v-model="service"
                            class="w-full bg-transparent border-none focus:ring-0 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 font-medium"
                            placeholder="What do you need help with?" type="text" />
                    </div>
                    <div class="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
                    <div class="flex-1 flex items-center w-full px-4 py-3 md:py-0">
                        <span class="material-symbols-outlined text-slate-400 mr-3">location_on</span>
                        <input v-model="location"
                            class="w-full bg-transparent border-none focus:ring-0 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 font-medium"
                            placeholder="Location in Jordan" type="text" />
                    </div>
                    <button @click="searchServices"
                        class="w-full md:w-auto bg-primary text-white px-8 py-4 rounded-xl md:rounded-full font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                        <span class="hidden md:inline">Search</span>
                        <span class="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>

            <!-- Trust Indicators -->
            <div class="mt-8 flex flex-wrap justify-center gap-6">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-sm">check_circle</span>
                    <span class="text-xs font-bold text-slate-500 uppercase">Verified Local Pros</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-sm">shield_with_heart</span>
                    <span class="text-xs font-bold text-slate-500 uppercase">Secure Payment</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'HeroSection',
    data() {
        return {
            service: '',
            location: 'Amman'
        }
    },
    methods: {
        searchServices() {
            console.log(`Searching for: ${this.service} in ${this.location}`);
            // Navigate to search results or handle search
        }
    }
}
</script>
