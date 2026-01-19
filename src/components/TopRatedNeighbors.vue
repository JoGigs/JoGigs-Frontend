<template>
    <section>
        <div class="flex items-end justify-between mb-8">
            <div>
                <h3 class="text-3xl font-extrabold dark:text-white">Top Rated Neighbors</h3>
                <p class="text-slate-500 font-medium mt-1">Our most loved service providers this month</p>
            </div>
            <div class="flex gap-3">
                <button @click="scrollLeft"
                    class="w-12 h-12 rounded-full border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center hover:bg-white hover:border-primary transition-all">
                    <span class="material-symbols-outlined">chevron_left</span>
                </button>
                <button @click="scrollRight"
                    class="w-12 h-12 rounded-full border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center hover:bg-white hover:border-primary transition-all text-primary">
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div v-for="pro in professionals" :key="pro.id"
                class="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300 shadow-sm hover:shadow-2xl group relative">
                <!-- Image -->
                <div class="relative h-56 overflow-hidden">
                    <div class="absolute inset-0 bg-cover bg-center"
                        :style="{ backgroundImage: `url('${pro.image}')` }"></div>
                    <div v-if="pro.badge" class="absolute top-4 left-4" :class="{
                        'bg-accent text-slate-900': pro.badge.type === 'top',
                        'bg-primary text-white': pro.badge.type === 'new'
                    }">
                        <span class="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-lg">
                            {{ pro.badge.text }}
                        </span>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-6">
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <h5 class="font-extrabold text-xl dark:text-white">{{ pro.name }}</h5>
                            <p class="text-sm font-bold text-slate-400">{{ pro.specialty }} • {{ pro.area }}</p>
                        </div>
                        <div
                            class="bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg flex items-center text-primary">
                            <span class="material-symbols-outlined text-sm fill-1">star</span>
                            <span class="text-sm font-black ml-1">{{ pro.rating }}</span>
                        </div>
                    </div>

                    <!-- Tags -->
                    <div class="flex flex-wrap gap-2 mb-6">
                        <span v-for="tag in pro.tags" :key="tag"
                            class="text-[10px] font-black bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-full text-slate-500 uppercase">
                            {{ tag }}
                        </span>
                    </div>

                    <!-- Price and Action -->
                    <div
                        class="flex items-center justify-between mt-auto pt-4 border-t-2 border-slate-50 dark:border-slate-700/50">
                        <div>
                            <span class="text-xs font-black text-slate-400 uppercase">Gigs from</span>
                            <p class="text-2xl font-black text-slate-900 dark:text-white">{{ pro.price }} <span
                                    class="text-sm font-semibold">JOD</span></p>
                        </div>
                        <button
                            class="bg-primary text-white p-3 rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                            <span class="material-symbols-outlined block">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'TopRatedNeighbors',
    data() {
        return {
            professionals: [
                {
                    id: 1,
                    name: 'Marcus T.',
                    specialty: 'Master Plumber',
                    area: 'Abdoun',
                    rating: '4.9',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr_pqQ_iz9IkYW9ZaD28aKVAmhfLM-ynXCPcdWA4MQ-Dq_GJfZ2IhmFN7j2-Syz5vnJakvXtQayOU926VN-Ra-q-RWdudocDHg4Ua9GNrQGjit9qQhhx7LN4mMVcaJn34iY1g1-fPt-wAz3ypIpgykZn48nJU22pUUuFOObt_9AKsXFJhd3FfrvoaC1ZaiP8WC6zsCacSRXAfcmdf13gsetdRDkG7caIAKV6GYBar48vGaELTgUnWh3-XCg-4TMKump2f7_87TBOXC',
                    price: 25,
                    badge: { type: 'top', text: 'Amman Top Pro' },
                    tags: ['Trusted Neighbor', 'Fixed Price']
                },
                {
                    id: 2,
                    name: 'Elena R.',
                    specialty: 'Cleaning',
                    area: 'Khalda',
                    rating: '5.0',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPWLEkp54fPGIYNCGzjpUYO_s62nVk2UMfNMKNqxBKDWFLiu-Q4ohF9jyZTJwfw0AhlgrwCJNNBLd4KK_-_uaarIptyPlPrP30WpUbUJ_iSLq8NPJGcLjT0yKhQ5U8Z68tmyaO7KO_Bcgw-q3ZR1-rCHegbRpWHCjj_9S7uR4zlh8-QJvNQVv6xQxFWZtOMZVsc7w3QyNqA0YTUxsaZBDrZx_C_FPU0vuql5gb5QJ0Fzh_RNJhPE3kzRylWXLzqjChc9t4HO-i4oFc',
                    price: 15,
                    tags: ['Same Day']
                },
                {
                    id: 3,
                    name: 'David C.',
                    specialty: 'Electrician',
                    area: 'Sweifieh',
                    rating: '4.8',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAo5_5o9m-dxriRU9ZOolHVjoiQgHoOZcgXmZuy9vPmXYhGfOLENhbrzmUSYwW4_Hg2MMjrKubqaLQuAzGs0A3ecJheKkyyNejOJteXYw8RUedpaio22SfiK-Qlcc1LTcTa3ST8sqSXH5ExvtfBYK6r_4xktzkArG0Z8fq9uTif7LBW_ohCVhazU-OF0ma2nACHzGZZLsPZ_4kkaS8jzTPS-nCkF-oQFad99SR8dEOwgF1kUlFrA3ABAGDUa15gym_IeWuVPZ88X775',
                    price: 35,
                    badge: { type: 'new', text: 'New Pro' },
                    tags: ['24/7 Available']
                },
                {
                    id: 4,
                    name: 'Sarah J.',
                    specialty: 'Gardener',
                    area: 'Irbid',
                    rating: '4.7',
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDa-2sqwy3Qq0fYFBXee5uE-Kk4u-iT2xbjRVqIxfHVKbFTICqE-dHEZL-vLtxi9l9bxq5LORSlrk6tm_2_v0xMzsDK9MX0F2u9oiFtOPb_Xi7UCj_Mf3Btqbt7PRYNcRiKpRaU8lRkO7jBRJzSwyL5NxuRC2GGJJbjFbwrnA3pAtymBqzg7lGJyc1r3rXQq1mpj6-X4wPorCT0-p0yYQC4Qnr6CdXESji7QOJuRmMBTgtwDBlDA5SOSm6hvg_T55sohQ50ehP2gth',
                    price: 20,
                    tags: ['Equipped']
                }
            ]
        }
    },
    methods: {
        scrollLeft() {
            console.log('Scroll left');
        },
        scrollRight() {
            console.log('Scroll right');
        }
    }
}
</script>
