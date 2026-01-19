<template>
    <div class="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center px-4">
        <div class="w-full max-w-md">
            <!-- Logo Section -->
            <div class="flex items-center justify-center gap-3 mb-8">
                <div
                    class="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-xl rotate-3 shadow-lg shadow-primary/20">
                    <span class="material-symbols-outlined text-2xl">handyman</span>
                </div>
                <div>
                    <h1 class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">JoGigs</h1>
                    <p class="text-xs font-bold text-primary uppercase tracking-widest">Jordan's Service Marketplace</p>
                </div>
            </div>

            <!-- Login Card -->
            <div
                class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-700">
                <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Welcome Back</h2>
                <p class="text-slate-600 dark:text-slate-400 mb-8">Log in to find and book local services</p>

                <form @submit.prevent="handleLogin" class="space-y-5">
                    <!-- Email -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email
                            Address</label>
                        <input v-model="form.email" type="email" placeholder="you@example.com"
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required />
                        <span v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</span>
                    </div>

                    <!-- Password -->
                    <div>
                        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password</label>
                        <input v-model="form.password" type="password" placeholder="••••••••"
                            class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required />
                        <span v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</span>
                    </div>

                    <!-- Remember Me -->
                    <div class="flex items-center gap-2">
                        <input v-model="form.rememberMe" type="checkbox" id="remember"
                            class="w-4 h-4 text-primary focus:ring-primary border-slate-300 rounded" />
                        <label for="remember" class="text-sm font-medium text-slate-600 dark:text-slate-400">Remember
                            me</label>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" :disabled="isLoading"
                        class="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">
                        {{ isLoading ? 'Logging in...' : 'Log In' }}
                    </button>
                </form>

                <!-- Forgot Password -->
                <div class="mt-6 text-center">
                    <router-link to="/forgot-password" class="text-sm font-bold text-primary hover:underline">Forgot
                        your password?</router-link>
                </div>

                <!-- Sign Up Link -->
                <p class="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                    Don't have an account?
                    <router-link to="/signup" class="font-bold text-primary hover:underline">Sign Up</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            form: {
                email: '',
                password: '',
                rememberMe: false
            },
            errors: {
                email: '',
                password: ''
            },
            isLoading: false
        }
    },
    methods: {
        handleLogin() {
            this.errors = { email: '', password: '' }

            if (!this.form.email) {
                this.errors.email = 'Email is required'
                return
            }
            if (!this.form.password) {
                this.errors.password = 'Password is required'
                return
            }

            this.isLoading = true
            // Simulate API call
            setTimeout(() => {
                this.isLoading = false
                // Store auth state (implement with proper auth)
                console.log('Login attempt:', this.form.email)
                // Redirect to home
                this.$router.push('/')
            }, 1500)
        }
    }
}
</script>
