<template>
    <section class="relative py-12 mb-16 overflow-hidden rounded-3xl bg-emerald-50 dark:bg-emerald-950/20 px-8">
        <div class="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 blob-shape"></div>
        <div class="absolute -bottom-12 -left-12 w-48 h-48 bg-accent/20 blob-shape"></div>
        <div class="relative z-10 text-center max-w-3xl mx-auto">
            <span
                class="inline-block px-4 py-1.5 bg-white dark:bg-slate-800 rounded-full text-xs font-bold text-primary shadow-sm mb-6">
                Browse and Book
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
                From plumbing to painting, find maintenance and repair professionals in your area. Customer rated service, clear
                prices.
            </p>

            <div class="mt-8 flex flex-wrap justify-center gap-6">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-sm">check_circle</span>
                    <span class="text-xs font-bold text-slate-500 uppercase">Verified Handymen</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary text-sm">shield_with_heart</span>
                    <span class="text-xs font-bold text-slate-500 uppercase">Cash Payment</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'HeroSection',
}
</script>
