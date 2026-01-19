<template>
    <div class="bg-background-light dark:bg-background-dark min-h-screen">
        <!-- Header -->
        <header
            class="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800">
            <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <router-link to="/" class="flex items-center gap-3 group cursor-pointer">
                    <div
                        class="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-xl rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-primary/20">
                        <span class="material-symbols-outlined text-2xl">handyman</span>
                    </div>
                    <div class="flex flex-col -space-y-1">
                        <span
                            class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">JoGigs</span>
                        <span class="text-[10px] font-bold text-primary uppercase tracking-widest">For
                            Professionals</span>
                    </div>
                </router-link>
                <button class="text-sm font-bold text-slate-600 hover:text-primary transition-colors">Dashboard</button>
            </div>
        </header>

        <main class="max-w-4xl mx-auto px-6 py-12">
            <!-- Page Header -->
            <div class="mb-8">
                <h1 class="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Create New Service</h1>
                <p class="text-slate-600 dark:text-slate-400">List your professional service and reach customers in your
                    area</p>
            </div>

            <!-- Form Card -->
            <div
                class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-700">
                <form @submit.prevent="handleSubmit" class="space-y-8">
                    <!-- Service Category -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Service
                            Category</label>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <button v-for="category in categories" :key="category.value" type="button"
                                @click="form.category = category.value" :class="{
                                    'bg-primary text-white border-primary': form.category === category.value,
                                    'border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-primary': form.category !== category.value
                                }" class="py-3 px-4 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2">
                                <span class="material-symbols-outlined text-xl">{{ category.icon }}</span>
                                <span class="text-sm">{{ category.label }}</span>
                            </button>
                        </div>
                        <span v-if="errors.category" class="text-red-500 text-xs mt-1">{{ errors.category }}</span>
                    </div>

                    <!-- Service Title -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Service
                            Title</label>
                        <input v-model="form.title" type="text"
                            placeholder="e.g., Professional Plumbing Services in Amman"
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required />
                        <span v-if="errors.title" class="text-red-500 text-xs mt-1">{{ errors.title }}</span>
                    </div>

                    <!-- Description -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Service
                            Description</label>
                        <textarea v-model="form.description" rows="5"
                            placeholder="Describe your service, experience, and what makes you stand out..."
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                            required></textarea>
                        <p class="text-xs text-slate-500 mt-1">{{ form.description.length }}/500 characters</p>
                        <span v-if="errors.description" class="text-red-500 text-xs mt-1">{{ errors.description
                            }}</span>
                    </div>

                    <!-- Pricing -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Starting
                                Price (JOD)</label>
                            <input v-model.number="form.price" type="number" min="0" step="0.5" placeholder="25"
                                class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                required />
                            <span v-if="errors.price" class="text-red-500 text-xs mt-1">{{ errors.price }}</span>
                        </div>

                        <div>
                            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Pricing
                                Type</label>
                            <select v-model="form.pricingType"
                                class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                                <option value="fixed">Fixed Price</option>
                                <option value="hourly">Per Hour</option>
                                <option value="project">Per Project</option>
                            </select>
                        </div>
                    </div>

                    <!-- Location Coverage -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Service
                            Areas</label>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <label v-for="area in areas" :key="area"
                                class="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" :value="area" v-model="form.serviceAreas"
                                    class="w-4 h-4 text-primary focus:ring-primary border-slate-300 rounded" />
                                <span
                                    class="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-primary">{{
                                    area }}</span>
                            </label>
                        </div>
                        <span v-if="errors.serviceAreas" class="text-red-500 text-xs mt-1">{{ errors.serviceAreas
                            }}</span>
                    </div>

                    <!-- Availability -->
                    <div>
                        <label
                            class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Availability</label>
                        <div class="space-y-3">
                            <label class="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" v-model="form.availableNow"
                                    class="w-5 h-5 text-primary focus:ring-primary border-slate-300 rounded" />
                                <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">Available for
                                    immediate booking</span>
                            </label>
                            <label class="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" v-model="form.emergencyService"
                                    class="w-5 h-5 text-primary focus:ring-primary border-slate-300 rounded" />
                                <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">24/7 Emergency
                                    service available</span>
                            </label>
                        </div>
                    </div>

                    <!-- Experience & Certifications -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Years of
                            Experience</label>
                        <input v-model.number="form.experience" type="number" min="0" max="50" placeholder="e.g., 5"
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required />
                    </div>

                    <!-- Tags/Skills -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Key Skills &
                            Services</label>
                        <input v-model="form.tags" type="text"
                            placeholder="e.g., Leak repair, Water heater, Bathroom renovation (comma separated)"
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                        <p class="text-xs text-slate-500 mt-1">Separate multiple skills with commas</p>
                    </div>

                    <!-- Terms Agreement -->
                    <div
                        class="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-6 border border-slate-200 dark:border-slate-600">
                        <div class="flex items-start gap-3">
                            <input v-model="form.agreeTerms" type="checkbox" id="terms"
                                class="w-4 h-4 text-primary focus:ring-primary border-slate-300 rounded mt-1"
                                required />
                            <label for="terms" class="text-sm text-slate-600 dark:text-slate-400">
                                I confirm that all information provided is accurate and I agree to JoGigs
                                <a href="#" class="text-primary font-bold hover:underline">Professional Terms of
                                    Service</a>
                                and <a href="#" class="text-primary font-bold hover:underline">Service Provider
                                    Agreement</a>.
                            </label>
                        </div>
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
                { value: 'handyman', label: 'Handyman', icon: 'handyman' }
            ],
            areas: [
                'Abdoun', 'Jabal Amman', 'Khalda', 'Sweifieh',
                'Tla\'a Al-Ali', 'Dabouq', 'Zarqa', 'Irbid'
            ],
            form: {
                category: '',
                title: '',
                description: '',
                price: null,
                pricingType: 'fixed',
                serviceAreas: [],
                availableNow: false,
                emergencyService: false,
                experience: null,
                tags: '',
                agreeTerms: false
            },
            errors: {
                category: '',
                title: '',
                description: '',
                price: '',
                serviceAreas: ''
            },
            isLoading: false
        }
    },
    methods: {
        handleSubmit() {
            // Reset errors
            this.errors = {
                category: '',
                title: '',
                description: '',
                price: '',
                serviceAreas: ''
            }

            // Validation
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
            if (this.form.description.length > 500) {
                this.errors.description = 'Description must be less than 500 characters'
                return
            }
            if (!this.form.price || this.form.price <= 0) {
                this.errors.price = 'Please enter a valid price'
                return
            }
            if (this.form.serviceAreas.length === 0) {
                this.errors.serviceAreas = 'Please select at least one service area'
                return
            }
            if (!this.form.agreeTerms) {
                alert('Please agree to the terms and conditions')
                return
            }

            this.isLoading = true

            // Simulate API call
            setTimeout(() => {
                this.isLoading = false
                console.log('Service created:', {
                    ...this.form,
                    tags: this.form.tags.split(',').map(t => t.trim()).filter(Boolean)
                })
                // Redirect to dashboard or success page
                alert('Service created successfully!')
                this.$router.push('/')
            }, 1500)
        }
    }
}
</script>
