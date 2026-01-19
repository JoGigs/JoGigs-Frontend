<template>
    <div class="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center px-4 py-8">
        <div class="w-full max-w-md">
            <!-- Logo Section -->
            <div class="flex items-center justify-center gap-3 mb-8">
                <div
                    class="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-xl rotate-3 shadow-lg shadow-primary/20">
                    <span class="material-symbols-outlined text-2xl">handyman</span>
                </div>
                <div>
                    <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">JoGigs</h1>
                    <p class="text-xs font-bold text-primary uppercase tracking-widest">Join Our Community</p>
                </div>
            </div>

            <!-- Signup Card -->
            <div
                class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-700">
                <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Create Account</h2>
                <p class="text-slate-600 dark:text-slate-400 mb-8">Join JoGigs and find trusted local professionals</p>

                <!-- Account Type Selection -->
                <div class="mb-6 grid grid-cols-2 gap-3">
                    <button v-for="type in accountTypes" :key="type.value" @click="form.accountType = type.value"
                        :class="{
                            'bg-primary text-white border-primary': form.accountType === type.value,
                            'border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-primary': form.accountType !== type.value
                        }" class="py-3 rounded-xl border-2 font-bold transition-all">
                        <span class="material-symbols-outlined text-lg">{{ type.icon }}</span>
                        {{ type.label }}
                    </button>
                </div>

                <form @submit.prevent="handleSignup" class="space-y-5">
                    <!-- Full Name -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                        <input v-model="form.fullName" type="text" placeholder="John Doe"
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required />
                        <span v-if="errors.fullName" class="text-red-500 text-xs mt-1">{{ errors.fullName }}</span>
                    </div>

                    <!-- Email -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email
                            Address</label>
                        <input v-model="form.email" type="email" placeholder="you@example.com"
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required />
                        <span v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</span>
                    </div>

                    <!-- Phone -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Phone
                            Number</label>
                        <input v-model="form.phone" type="tel" placeholder="+962 7 XXXX XXXX"
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required />
                        <span v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</span>
                    </div>

                    <!-- Password -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
                        <input v-model="form.password" type="password" placeholder="••••••••"
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required />
                        <span v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</span>
                        <p class="text-xs text-slate-500 mt-1">At least 8 characters</p>
                    </div>

                    <!-- Confirm Password -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Confirm
                            Password</label>
                        <input v-model="form.confirmPassword" type="password" placeholder="••••••••"
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required />
                        <span v-if="errors.confirmPassword" class="text-red-500 text-xs mt-1">{{ errors.confirmPassword
                        }}</span>
                    </div>

                    <!-- Terms & Conditions -->
                    <div class="flex items-start gap-3">
                        <input v-model="form.agreeTerms" type="checkbox" id="terms"
                            class="w-4 h-4 text-primary focus:ring-primary border-slate-300 rounded mt-1" required />
                        <label for="terms" class="text-sm text-slate-600 dark:text-slate-400">
                            I agree to the
                            <a href="#" class="text-primary font-bold hover:underline">Terms of Service</a>
                            and
                            <a href="#" class="text-primary font-bold hover:underline">Privacy Policy</a>
                        </label>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" :disabled="isLoading"
                        class="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">
                        {{ isLoading ? 'Creating Account...' : 'Create Account' }}
                    </button>
                </form>

                <!-- Login Link -->
                <p class="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                    Already have an account?
                    <router-link to="/login" class="font-bold text-primary hover:underline">Log In</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Signup',
    data() {
        return {
            accountTypes: [
                { value: 'customer', label: 'Customer', icon: 'person' },
                { value: 'professional', label: 'Professional', icon: 'verified' }
            ],
            form: {
                accountType: 'customer',
                fullName: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
                agreeTerms: false
            },
            errors: {
                fullName: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: ''
            },
            isLoading: false
        }
    },
    methods: {
        handleSignup() {
            this.errors = {
                fullName: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: ''
            }

            // Validation
            if (!this.form.fullName.trim()) {
                this.errors.fullName = 'Full name is required'
                return
            }
            if (!this.form.email) {
                this.errors.email = 'Email is required'
                return
            }
            if (!this.form.phone) {
                this.errors.phone = 'Phone number is required'
                return
            }
            if (this.form.password.length < 8) {
                this.errors.password = 'Password must be at least 8 characters'
                return
            }
            if (this.form.password !== this.form.confirmPassword) {
                this.errors.confirmPassword = 'Passwords do not match'
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
                console.log('Signup attempt:', {
                    type: this.form.accountType,
                    email: this.form.email,
                    name: this.form.fullName
                })
                // Redirect to home
                this.$router.push('/')
            }, 1500)
        }
    }
}
</script>
