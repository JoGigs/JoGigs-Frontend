<template>
    <section class="mb-20">
        <div class="flex items-center justify-between mb-10">
            <div>
                <h3 class="text-3xl font-extrabold dark:text-white">Popular Services</h3>
                <p class="text-slate-500 font-medium mt-1">Book a pro in under 2 minutes</p>
            </div>
            <a class="hidden sm:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all" href="#">
                View All
                <span class="material-symbols-outlined">arrow_forward</span>
            </a>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div v-for="service in services" :key="service.id" class="group cursor-pointer text-center"
                @click="selectService(service)">
                <div
                    class="aspect-square bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center text-primary mb-4 border-2 border-slate-50 dark:border-slate-800 group-hover:border-primary group-hover:-translate-y-2 transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/10">
                    <span class="material-symbols-outlined text-4xl">{{ service.icon }}</span>
                </div>
                <h4 class="font-extrabold text-slate-800 dark:text-slate-100">{{ service.name }}</h4>
                <p class="text-xs font-bold text-primary mt-1">{{ service.count }}+ Near you</p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'PopularServices',
    data() {
        return {
            services: [
                { id: 1, name: 'Plumbing', icon: 'plumbing', count: 120 },
                { id: 2, name: 'Electricians', icon: 'bolt', count: 85 },
                { id: 3, name: 'Cleaning', icon: 'cleaning_services', count: 200 },
                { id: 4, name: 'Garden Care', icon: 'potted_plant', count: 45 },
                { id: 5, name: 'Painting', icon: 'format_paint', count: 60 }
            ]
        }
    },
    methods: {
        selectService(service) {
            console.log(`Selected service: ${service.name}`);
            // Navigate to service listings
        }
    }
}
</script>
