<template>
    <section class="mt-24 bg-accent/10 rounded-[3rem] p-12 flex flex-col md:flex-row items-center gap-10">
        <div class="md:w-1/2">
            <h3 class="font-handwritten text-4xl text-primary mb-2">Join the neighborhood</h3>
            <h4 class="text-4xl font-extrabold text-slate-900 dark:text-white mb-6">Are you a local pro in Jordan?</h4>
            <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Join thousands of skilled professionals earning on their own schedule. Build your reputation, grow your
                income, and become part of Jordan's trusted service community.
            </p>
            <button
                class="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-10 py-4 rounded-full font-extrabold hover:scale-105 transition-all shadow-xl">
                Become a Pro →
            </button>
        </div>
        <div class="md:w-1/2 relative h-64 w-full rounded-2xl bg-slate-200 dark:bg-slate-700 bg-cover bg-center overflow-hidden"
            style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB98n8qheUMCPGjhfbAcDx9ZELfO541_FQvWs-IZvqWVhycc1IpywDC29rQckQhQ1yfntVwWBtCcusgLpdIJwGs3f_dRfL83fDsPQBVtOyNmDpwP4S26vCzLFB_FJDyObiPI9z91pHn_IzJLfeMQ4PQkGCTKcdEyrcS1QLQWC1jhrngr-2uNdL9bEQWtmY2_J2IQtA6I2Kf2q5_iO2p6cet5nRpHogEKRUOH3jZEbP2yD-6_pS9MWG_4BlqbF1fKhJ3nMq_ZGXuoB2u')">
            <div class="absolute inset-0 bg-primary/20"></div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'JoinSection'
}
</script>
