import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-6">
            <div className="w-full max-w-sm">
                <div className="flex items-center gap-2.5 mb-8">
                    <div className="w-7 h-7 bg-[#EF4444] rounded flex items-center justify-center">
                        <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                            <path d="M3 3L9 3L15 9L9 15L3 9L9 3Z" fill="white" fillOpacity="0.9" />
                        </svg>
                    </div>
                    <span className="font-semibold text-neutral-900">ContentDesk</span>
                </div>

                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-neutral-900">Reset your password</h1>
                    <p className="text-sm text-neutral-500 mt-1">Enter your email and we&apos;ll send you a reset link</p>
                </div>

                <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1.5">Email Address</label>
                        <input
                            type="email"
                            placeholder="you@company.com"
                            className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 placeholder-neutral-400"
                        />
                    </div>
                    <button className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
                        Send Reset Link
                    </button>
                </div>

                <Link
                    href="/login"
                    className="flex items-center justify-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800 mt-4 transition-colors"
                >
                    <ArrowLeft size={13} /> Back to sign in
                </Link>
            </div>
        </div>
    );
}
