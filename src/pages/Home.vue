<template>
    <div class="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 min-h-screen">
        <Header />
        <main class="max-w-7xl mx-auto px-6 py-8">
            <HeroSection />
            <PopularServices />
        </main>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import HeroSection from '../components/HeroSection.vue'
import PopularServices from '../components/PopularServices.vue'

export default {
    name: 'Home',
    components: {
        Header,
        HeroSection,
        PopularServices,
    }
}
</script>
