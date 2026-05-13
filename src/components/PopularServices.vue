<template>
    <section class="mb-20">
        <div class="flex items-center justify-between mb-10">
            <div>
                <h3 class="text-3xl font-extrabold dark:text-white">Browse Services</h3>
                <p class="text-slate-500 font-medium mt-1">Book a pro in under 2 minutes</p>
            </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div v-for="service in services" :key="service.id" class="group cursor-pointer text-center"
                @click="selectService(service)">
                <div
                    class="aspect-square bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center text-primary mb-4 border-2 border-slate-50 dark:border-slate-800 group-hover:border-primary group-hover:-translate-y-2 transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/10">
                    <span class="material-symbols-outlined text-4xl">{{ service.icon }}</span>
                </div>
                <h4 class="font-extrabold text-slate-800 dark:text-slate-100">{{ service.name }}</h4>
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
                { id: 1, name: 'Plumbing',    slug: 'plumbing',   icon: 'plumbing' },
                { id: 2, name: 'Electrical',   slug: 'electrical', icon: 'bolt' },
                { id: 3, name: 'Cleaning',     slug: 'cleaning',   icon: 'cleaning_services' },
                { id: 4, name: 'Garden',       slug: 'garden',     icon: 'potted_plant' },
                { id: 5, name: 'Painting',     slug: 'painting',   icon: 'format_paint' },
            ]
        }
    },
    methods: {
        selectService(service) {
            this.$router.push(`/services/${service.slug}`)
        }
    }
}
</script>
