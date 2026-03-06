'use client';

import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { GoogleIcon } from '@/components/icons/GoogleIcon';

export default function LoginPage() {
    const { signIn, errors, fetchStatus } = useSignIn();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setLocalError('');

        try {
            const { error } = await signIn.password({
                identifier: email,
                password,
            });

            if (error) {
                setLocalError(error.message);
                return;
            }

            if (signIn.status === 'complete') {
                await signIn.finalize({
                    navigate: ({ decorateUrl }) => {
                        const url = decorateUrl('/dashboard');
                        if (url.startsWith('http')) {
                            window.location.href = url;
                        } else {
                            router.push(url);
                        }
                    },
                });
            }
        } catch (err: any) {
            setLocalError('An unexpected error occurred during sign in');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        if (!signIn) return;
        setGoogleLoading(true);
        setLocalError('');
        try {
            const { error: ssoError } = await signIn.sso({
                strategy: 'oauth_google',
                redirectUrl: '/dashboard',
                redirectCallbackUrl: '/sso-callback',
            });
            if (ssoError) {
                setLocalError(ssoError.message);
                setGoogleLoading(false);
            }
        } catch (err: any) {
            setLocalError('An error occurred during Google sign in');
            setGoogleLoading(false);
        }
    };

    const globalError = errors?.global?.[0]?.message || localError;

    return (
        <div className="min-h-screen bg-neutral-100 flex">
            {/* Left — Branding Panel (Preserved) */}
            <div className="hidden lg:flex flex-col justify-between w-96 bg-[#111111] p-10 shrink-0">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-[#EF4444] rounded flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M3 3L9 3L15 9L9 15L3 9L9 3Z" fill="white" fillOpacity="0.9" />
                            <path d="M9 3L15 3L15 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span className="text-white font-semibold text-base tracking-tight">ContentDesk</span>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-white leading-snug">
                        Your content,<br />delivered on time.
                    </h2>
                    <p className="text-sm text-white/50 mt-3 leading-relaxed">
                        Track orders, collaborate with your writing team, and grow your business — all in one place.
                    </p>
                    <div className="mt-8 space-y-3">
                        {['Order tracking in real-time', 'Multi-step brief builder', 'Revision management', 'Invoicing & billing'].map(f => (
                            <div key={f} className="flex items-center gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                                <p className="text-sm text-white/70">{f}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-xs text-white/30">© 2024 ContentDesk. All rights reserved.</p>
            </div>

            {/* Right — Custom Login Form */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-sm">
                    {/* Mobile logo */}
                    <div className="flex items-center gap-2.5 mb-8 lg:hidden">
                        <div className="w-7 h-7 bg-[#EF4444] rounded flex items-center justify-center">
                            <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                                <path d="M3 3L9 3L15 9L9 15L3 9L9 3Z" fill="white" fillOpacity="0.9" />
                            </svg>
                        </div>
                        <span className="font-semibold text-neutral-900">ContentDesk</span>
                    </div>

                    <div className="mb-6">
                        <h1 className="text-xl font-semibold text-neutral-900">Welcome back</h1>
                        <p className="text-sm text-neutral-500 mt-1">Sign in to your client dashboard</p>
                    </div>

                    {globalError && (
                        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-medium">
                            {globalError}
                        </div>
                    )}

                    <div className="space-y-4 mb-6">
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={googleLoading}
                            className="w-full flex items-center justify-center gap-2 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-sm font-medium py-2.5 rounded-lg transition-colors shadow-sm disabled:opacity-50"
                        >
                            {googleLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin"></div>
                                    <span>Redirecting...</span>
                                </div>
                            ) : (
                                <>
                                    <GoogleIcon />
                                    Continue with Google
                                </>
                            )}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-neutral-100"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#fcfcfc] px-2 text-neutral-400 font-medium">Or continue with email</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-neutral-200 shadow-card p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-neutral-600 mb-1.5">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                required
                                className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 placeholder-neutral-400"
                            />
                            {errors?.fields?.identifier && <p className="text-xs text-red-500 mt-1">{errors.fields.identifier.message}</p>}
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-medium text-neutral-600">Password</label>
                                <Link href="/forgot-password" title="Forgot password" className="text-xs text-[#EF4444] hover:text-[#DC2626] font-medium transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 placeholder-neutral-300"
                            />
                            {errors?.fields?.password && <p className="text-xs text-red-500 mt-1">{errors.fields.password.message}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={loading || (fetchStatus === 'fetching' && !googleLoading)}
                            className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading || (fetchStatus === 'fetching' && !googleLoading) ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-neutral-500 mt-4">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-[#EF4444] font-medium hover:text-[#DC2626] transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
