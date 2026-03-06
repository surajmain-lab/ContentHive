'use client'

import Link from 'next/link'
import { Button } from '@/components/shared/Button'

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-0.5">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-white rounded-full opacity-50"></div>
                    </div>
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900">ContentHive</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                <Link href="#features" className="hover:text-gray-900 transition-colors">Features</Link>
                <Link href="#solutions" className="hover:text-gray-900 transition-colors">Solutions</Link>
                <Link href="#resources" className="hover:text-gray-900 transition-colors">Resources</Link>
                <Link href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" asChild className="text-sm font-medium">
                    <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                    <Link href="/signup">Get demo</Link>
                </Button>
            </div>
        </nav>
    )
}
