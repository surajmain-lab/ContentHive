'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    CheckSquare,
    Inbox,
    Calendar,
    BarChart2,
    Briefcase,
    Settings,
    HelpCircle,
    UserPlus,
    ChevronDown,
    Plus
} from 'lucide-react';

const mainNav = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/orders', icon: CheckSquare, label: 'My Orders' },
];



export function Sidebar() {
    const pathname = usePathname();
    const isActive = (href: string) => {
        if (href === '/dashboard') return pathname === '/dashboard';
        return pathname.startsWith(href);
    };

    return (
        <aside className="fixed inset-y-0 left-0 z-40 flex flex-col w-64 bg-[#1a1736] text-[#A3B1C6] font-medium overflow-y-auto overflow-x-hidden hide-scrollbar">
            {/* Brand Logo */}
            <div className="flex items-center gap-3 h-20 px-6 shrink-0 text-white cursor-pointer group">
                <div className="flex items-center justify-center w-8 h-8 bg-indigo-500 rounded-lg group-hover:scale-105 transition-transform">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                    </svg>
                </div>
                <span className="text-lg font-bold tracking-wide">ContentDesk</span>
                <ChevronDown size={14} className="ml-auto opacity-50 hidden sm:block" />
            </div>

            {/* Main Navigation */}
            <div className="px-3 py-2 space-y-0.5">
                {mainNav.map(({ href, icon: Icon, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={cn(
                            'group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer',
                            isActive(href)
                                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                                : 'hover:bg-white/5 hover:text-white'
                        )}
                    >
                        <Icon size={18} strokeWidth={isActive(href) ? 2.2 : 1.75} className={isActive(href) ? 'text-white' : 'text-[#8896AF] group-hover:text-white'} />
                        <span className="text-[14px]">{label}</span>
                        {isActive(href) && <ChevronDown size={14} className="ml-auto opacity-80" />}
                    </Link>
                ))}
            </div>



            {/* Bottom Actions */}
            <div className="px-3 py-4 mt-auto space-y-0.5">
                {[
                    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
                ].map(({ href, icon: Icon, label }) => (
                    <Link
                        key={label}
                        href={href}
                        className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-white/5 hover:text-white cursor-pointer"
                    >
                        <Icon size={18} strokeWidth={1.75} className="text-[#8896AF] group-hover:text-white" />
                        <span className="text-[14px]">{label}</span>
                    </Link>
                ))}
            </div>
            {/* Additional CSS for hiding explicit scrollbar safely */}
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </aside>
    );
}
