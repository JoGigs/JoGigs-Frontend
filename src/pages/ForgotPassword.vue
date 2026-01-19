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
                    <p class="text-xs font-bold text-primary uppercase tracking-widest">Reset Password</p>
                </div>
            </div>

            <!-- Forgot Password Card -->
            <div
                class="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-700">
                <div v-if="!emailSent">
                    <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Forgot Password?</h2>
                    <p class="text-slate-600 dark:text-slate-400 mb-8">No worries! Enter your email address and we'll
                        send you instructions to reset your password.</p>

                    <form @submit.prevent="handleForgotPassword" class="space-y-5">
                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email
                                Address</label>
                            <input v-model="form.email" type="email" placeholder="you@example.com"
                                class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                required />
                            <span v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</span>
                        </div>

                        <!-- Submit Button -->
                        <button type="submit" :disabled="isLoading"
                            class="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">
                            {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
                        </button>
                    </form>

                    <!-- Back to Login -->
                    <p class="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                        Remember your password?
                        <router-link to="/login" class="font-bold text-primary hover:underline">Log In</router-link>
                    </p>
                </div>

                <!-- Success State -->
                <div v-else class="text-center">
                    <div class="flex justify-center mb-6">
                        <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                            <span class="material-symbols-outlined text-5xl text-primary">mail</span>
                        </div>
                    </div>

                    <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">Check Your Email</h2>
                    <p class="text-slate-600 dark:text-slate-400 mb-6">
                        We've sent a password reset link to <span class="font-bold text-slate-900 dark:text-white">{{
                            form.email }}</span>
                    </p>

                    <div
                        class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-8">
                        <p class="text-sm text-blue-900 dark:text-blue-200">
                            <span class="font-bold">Tip:</span> Check your spam folder if you don't see the email within
                            a few minutes.
                        </p>
                    </div>

                    <button @click="handleResendEmail" :disabled="resendCooldown > 0"
                        class="w-full border-2 border-primary text-primary py-3 rounded-xl font-bold hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Email' }}
                    </button>

                    <!-- Back to Login -->
                    <p class="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                        <router-link to="/login" class="font-bold text-primary hover:underline">Back to
                            Login</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ForgotPassword',
    data() {
        return {
            form: {
                email: ''
            },
            errors: {
                email: ''
            },
            isLoading: false,
            emailSent: false,
            resendCooldown: 0
        }
    },
    methods: {
        handleForgotPassword() {
            this.errors = { email: '' }

            if (!this.form.email) {
                this.errors.email = 'Email is required'
                return
            }

            this.isLoading = true
            // Simulate API call
            setTimeout(() => {
                this.isLoading = false
                this.emailSent = true
                this.startResendCooldown()
                console.log('Password reset email sent to:', this.form.email)
            }, 1500)
        },

        handleResendEmail() {
            if (this.resendCooldown > 0) return

            this.isLoading = true
            setTimeout(() => {
                this.isLoading = false
                this.startResendCooldown()
                console.log('Password reset email resent to:', this.form.email)
            }, 1500)
        },

        startResendCooldown() {
            this.resendCooldown = 60
            const interval = setInterval(() => {
                this.resendCooldown--
                if (this.resendCooldown <= 0) {
                    clearInterval(interval)
                }
            }, 1000)
        }
    }
}
</script>
