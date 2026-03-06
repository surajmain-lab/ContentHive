'use client';

import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { GoogleIcon } from '@/components/icons/GoogleIcon';

export default function SignupPage() {
    const { signUp, errors, fetchStatus } = useSignUp();
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [code, setCode] = useState('');
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleGoogleSignUp = async () => {
        if (!signUp) return;
        setGoogleLoading(true);
        setError('');
        try {
            const { error: ssoError } = await signUp.sso({
                strategy: 'oauth_google',
                redirectUrl: '/dashboard',
                redirectCallbackUrl: '/sso-callback',
            });
            if (ssoError) {
                setError(ssoError.message);
                setGoogleLoading(false);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during Google sign up');
            setGoogleLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!signUp) return;

        setLoading(true);
        setError('');

        try {
            const { error: signUpError } = await signUp.password({
                firstName,
                lastName,
                emailAddress: email,
                password,
            });

            if (signUpError) {
                setError(signUpError.message);
                return;
            }

            const { error: sendError } = await signUp.verifications.sendEmailCode();
            if (sendError) {
                setError(sendError.message);
                return;
            }

            setVerifying(true);
        } catch (err: any) {
            setError(err.message || 'An error occurred during sign up');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!signUp) return;

        setLoading(true);
        setError('');

        try {
            const { error: verifyError } = await signUp.verifications.verifyEmailCode({
                code,
            });

            if (verifyError) {
                setError(verifyError.message);
                setLoading(false);
                return;
            }

            if (signUp.status === 'complete') {
                await signUp.finalize({
                    navigate: ({ decorateUrl }) => {
                        const url = decorateUrl('/dashboard');
                        if (url.startsWith('http')) {
                            window.location.href = url;
                        } else {
                            router.push(url);
                        }
                    },
                });
            } else {
                setError('Registration incomplete. Please check for more requirements.');
            }
        } catch (err: any) {
            setError(err.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    if (verifying) {
        return (
            <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-6 font-sans">
                <style jsx global>{`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                    body { font-family: 'Inter', sans-serif; }
                `}</style>
                <div className="w-full max-w-sm">
                    <div className="mb-6 text-center">
                        <h1 className="text-xl font-semibold text-neutral-900">Verify your email</h1>
                        <p className="text-sm text-neutral-500 mt-1">We sent a code to {email}</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleVerify} className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-neutral-600 mb-1.5 uppercase tracking-wider">Verification Code</label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="123456"
                                required
                                className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444] transition-all placeholder-neutral-400"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-semibold py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md disabled:opacity-50 active:scale-[0.98]"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifying...
                                </span>
                            ) : 'Verify Email'}
                        </button>
                    </form>
                    <button
                        onClick={() => signUp?.verifications.sendEmailCode()}
                        className="w-full mt-4 text-xs font-medium text-neutral-500 hover:text-neutral-800 transition-colors"
                    >
                        Didn't get a code? Resend
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-6 font-sans">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                body { font-family: 'Inter', sans-serif; }
            `}</style>
            <div className="w-full max-w-sm">
                <div className="flex items-center gap-2.5 mb-8 justify-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-lg shadow-sm flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M3 3L9 3L15 9L9 15L3 9L9 3Z" fill="white" fillOpacity="0.95" />
                        </svg>
                    </div>
                    <span className="text-lg font-bold tracking-tight text-neutral-900">ContentDesk</span>
                </div>

                <div className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Create your account</h1>
                    <p className="text-sm text-neutral-500 mt-1">Join the future of content management</p>
                </div>

                {(error || errors?.global?.[0]) && (
                    <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-medium">
                        {error || errors?.global?.[0]?.message}
                    </div>
                )}

                <div className="space-y-4 mb-6">
                    <button
                        onClick={handleGoogleSignUp}
                        disabled={googleLoading}
                        className="w-full flex items-center justify-center gap-2 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-sm font-medium py-2.5 rounded-lg transition-colors shadow-sm disabled:opacity-50"
                    >
                        {googleLoading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin"></div>
                                <span>Redirecting to Google...</span>
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

                <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-neutral-600 mb-1.5 uppercase tracking-wider">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Alex"
                                required
                                className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444] transition-all placeholder-neutral-400"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-neutral-600 mb-1.5 uppercase tracking-wider">Last Name</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Johnson"
                                required
                                className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444] transition-all placeholder-neutral-400"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1.5 uppercase tracking-wider">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            required
                            className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444] transition-all placeholder-neutral-400"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1.5 uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444] transition-all placeholder-neutral-300"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading || (fetchStatus === 'fetching' && !googleLoading)}
                        className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-semibold py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md disabled:opacity-50 active:scale-[0.98]"
                    >
                        {loading || (fetchStatus === 'fetching' && !googleLoading) ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {verifying ? 'Verifying...' : 'Creating account...'}
                            </span>
                        ) : 'Create Account'}
                    </button>
                    {/* Clerk Captcha Div */}
                    <div id="clerk-captcha" />
                </form>

                <p className="text-center text-sm text-neutral-500 mt-6">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#EF4444] font-semibold hover:text-[#DC2626] transition-colors">Sign in</Link>
                </p>
            </div>
        </div>
    );
}

