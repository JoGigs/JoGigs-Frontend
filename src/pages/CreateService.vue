<template>
    <div class="bg-background-light dark:bg-background-dark min-h-screen">
        <header
            class="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800">
            <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <router-link to="/" class="flex items-center gap-3 group cursor-pointer">
                    <div
                        class="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-xl rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-primary/20">
                        <span class="material-symbols-outlined text-2xl">handyman</span>
                    </div>
                    <div class="flex flex-col -space-y-1">
                        <span class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">JoGigs</span>
                        <span class="text-[10px] font-bold text-primary uppercase tracking-widest">For Professionals</span>
                    </div>
                </router-link>
                <button @click="$router.push('/dashboard')" class="text-sm font-bold text-slate-600 hover:text-primary transition-colors">Service Management</button>
            </div>
        </header>

        <main class="max-w-4xl mx-auto px-6 py-12">
            <div class="mb-8">
                <h1 class="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Create New Service</h1>
                <p class="text-slate-600 dark:text-slate-400">List your professional service and reach customers in your area</p>
            </div>

            <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-700">
                <form @submit.prevent="handleSubmit" class="space-y-8">
                    <!-- Service Category -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Service Category</label>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <button v-for="cat in categories" :key="cat.value" type="button"
                                @click="form.category = cat.value" :class="{
                                    'bg-primary text-white border-primary': form.category === cat.value,
                                    'border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-primary': form.category !== cat.value
                                }" class="py-3 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2">
                                <span class="material-symbols-outlined text-xl">{{ cat.icon }}</span>
                                <span class="text-sm">{{ cat.label }}</span>
                            </button>
                        </div>
                        <span v-if="errors.category" class="text-red-500 text-xs mt-1">{{ errors.category }}</span>
                    </div>

                    <!-- Service Title -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Service Title</label>
                        <input v-model="form.title" type="text" placeholder="e.g., Professional Plumbing Services in Amman"
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required />
                        <span v-if="errors.title" class="text-red-500 text-xs mt-1">{{ errors.title }}</span>
                    </div>

                    <!-- Description -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Service Description</label>
                        <textarea v-model="form.description" rows="5" placeholder="Describe your service, experience, and what makes you stand out..."
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                            required></textarea>
                        <span v-if="errors.description" class="text-red-500 text-xs mt-1">{{ errors.description }}</span>
                    </div>

                    <!-- Price -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Price (JOD)</label>
                        <input v-model.number="form.price" type="number" min="0" step="0.5" placeholder="25"
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required />
                        <span v-if="errors.price" class="text-red-500 text-xs mt-1">{{ errors.price }}</span>
                    </div>

                    <!-- Location -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Location</label>
                        <input v-model="form.location" type="text" placeholder="e.g., Amman, Zarqa, Irbid"
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-4 pt-4">
                        <button type="button" @click="$router.go(-1)"
                            class="flex-1 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 py-3 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                            Cancel
                        </button>
                        <button type="submit" :disabled="isLoading"
                            class="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">
                            {{ isLoading ? 'Creating Service...' : 'Create Service' }}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>
</template>

<script>
import { createService } from '../services/serviceListing.service';

export default {
    name: 'CreateService',
    data() {
        return {
            categories: [
                { value: 'plumbing', label: 'Plumbing', icon: 'plumbing' },
                { value: 'electrical', label: 'Electrical', icon: 'bolt' },
                { value: 'cleaning', label: 'Cleaning', icon: 'cleaning_services' },
                { value: 'garden', label: 'Garden', icon: 'potted_plant' },
                { value: 'painting', label: 'Painting', icon: 'format_paint' },
            ],
            form: {
                category: '',
                title: '',
                description: '',
                price: null,
                location: '',
            },
            errors: {
                category: '',
                title: '',
                description: '',
                price: '',
            },
            isLoading: false
        }
    },
    methods: {
        async handleSubmit() {
            this.errors = { category: '', title: '', description: '', price: '' }

            if (!this.form.category) {
                this.errors.category = 'Please select a service category'
                return
            }
            if (!this.form.title.trim()) {
                this.errors.title = 'Service title is required'
                return
            }
            if (!this.form.description.trim()) {
                this.errors.description = 'Service description is required'
                return
            }
            if (!this.form.price || this.form.price <= 0) {
                this.errors.price = 'Please enter a valid price'
                return
            }

            this.isLoading = true
            try {
                const payload = {
                    title: this.form.title.trim(),
                    description: this.form.description.trim(),
                    price: this.form.price,
                    category: this.form.category,
                }
                if (this.form.location.trim()) {
                    payload.location = this.form.location.trim()
                }
                await createService(payload)
                this.$router.push('/dashboard')
            } catch (err) {
                const msg = err.response?.data?.message
                if (Array.isArray(msg)) {
                    this.errors.title = msg.join(', ')
                } else {
                    this.errors.title = msg || 'Could not create service. Please try again.'
                }
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>
