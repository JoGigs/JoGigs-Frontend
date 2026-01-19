<template>
    <div class="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 min-h-screen">
        <Header />
        <main class="max-w-7xl mx-auto px-6 py-8">
            <HeroSection />
            <PopularServices />
            <TopRatedNeighbors />
            <JoinSection />
        </main>
        <Footer />
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import HeroSection from '../components/HeroSection.vue'
import PopularServices from '../components/PopularServices.vue'
import TopRatedNeighbors from '../components/TopRatedNeighbors.vue'
import JoinSection from '../components/JoinSection.vue'

export default {
    name: 'Home',
    components: {
        Header,
        Footer,
        HeroSection,
        PopularServices,
        TopRatedNeighbors,
        JoinSection
    }
}
</script>
