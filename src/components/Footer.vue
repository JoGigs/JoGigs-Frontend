<template>
    <footer class="bg-slate-50 dark:bg-slate-900/50 mt-24 py-20 border-t border-slate-100 dark:border-slate-800">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
            <!-- Brand Column -->
            <div class="col-span-1 md:col-span-1">
                <div class="flex items-center gap-3 mb-8">
                    <div class="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-lg rotate-3">
                        <span class="material-symbols-outlined text-lg">handyman</span>
                    </div>
                    <span class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">JoGigs</span>
                </div>
                <p class="text-slate-500 font-medium leading-relaxed">
                    Connecting Jordan's neighborhoods with trusted local professionals. Quality service, fair prices,
                    zero hassle.
                </p>
                <div class="flex gap-4 mt-8">
                    <a class="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-100 dark:border-slate-700"
                        href="#">
                        <span class="material-symbols-outlined text-xl">brand_family</span>
                    </a>
                    <a class="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-100 dark:border-slate-700"
                        href="#">
                        <span class="material-symbols-outlined text-xl">share</span>
                    </a>
                </div>
            </div>

            <!-- Neighborhoods -->
            <div>
                <h6 class="font-black mb-8 text-slate-900 dark:text-white uppercase text-xs tracking-widest">
                    Neighborhoods</h6>
                <ul class="space-y-4 text-sm font-bold text-slate-500">
                    <li><a class="hover:text-primary transition-colors" href="#">West Amman</a></li>
                    <li><a class="hover:text-primary transition-colors" href="#">Irbid Central</a></li>
                    <li><a class="hover:text-primary transition-colors" href="#">Aqaba Coast</a></li>
                    <li><a class="hover:text-primary transition-colors" href="#">Zarqa City</a></li>
                </ul>
            </div>

            <!-- Helpful Links -->
            <div>
                <h6 class="font-black mb-8 text-slate-900 dark:text-white uppercase text-xs tracking-widest">Helpful
                    Links</h6>
                <ul class="space-y-4 text-sm font-bold text-slate-500">
                    <li><a class="hover:text-primary transition-colors" href="#">Safety Rules</a></li>
                    <li><a class="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                    <li><a class="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
                    <li><a class="hover:text-primary transition-colors" href="#">Contact Us</a></li>
                </ul>
            </div>

            <!-- Company -->
            <div>
                <h6 class="font-black mb-8 text-slate-900 dark:text-white uppercase text-xs tracking-widest">Company
                </h6>
                <ul class="space-y-4 text-sm font-bold text-slate-500">
                    <li><a class="hover:text-primary transition-colors" href="#">About Us</a></li>
                    <li><a class="hover:text-primary transition-colors" href="#">Blog</a></li>
                    <li><a class="hover:text-primary transition-colors" href="#">Careers</a></li>
                    <li><a class="hover:text-primary transition-colors" href="#">Press Kit</a></li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>
