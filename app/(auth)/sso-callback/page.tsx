'use client';

import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export default function SSOCallbackPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-100">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#EF4444] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-medium text-neutral-600">Completing sign in...</p>
                <AuthenticateWithRedirectCallback />
            </div>
        </div>
    );
}
