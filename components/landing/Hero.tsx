'use client'

import { Button } from '@/components/shared/Button'
import Link from 'next/link'

export function Hero() {
    return (
        <div className="relative pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Background radial gradient for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-8 animate-fade-in">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-sm font-medium text-blue-700">New: Multi-user workspace</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.1]">
                    Think, plan, and track <br />
                    <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">all in one place</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Efficiently manage your tasks and boost productivity with our all-in-one platform.
                    Designed for high-performance teams.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 text-base">
                        <Link href="/signup">Get free demo</Link>
                    </Button>
                    <Button variant="ghost" size="lg" className="rounded-full px-8 h-12 text-base group">
                        <Link href="/login" className="flex items-center gap-2">
                            See how it works
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
