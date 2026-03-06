'use client';

import { Bell, Search } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
    title: string;
    breadcrumbs?: { label: string; href?: string }[];
}

export function Header({ title, breadcrumbs }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-6 bg-white border-b border-neutral-200">
            {/* Left: Title + breadcrumbs */}
            <div>
                <h1 className="text-base font-semibold text-neutral-900">{title}</h1>
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <nav className="flex items-center gap-1 text-xs text-neutral-400 mt-0.5">
                        {breadcrumbs.map((crumb, i) => (
                            <span key={i} className="flex items-center gap-1">
                                {i > 0 && <span>/</span>}
                                {crumb.href ? (
                                    <Link href={crumb.href} className="hover:text-neutral-700 transition-colors">
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className="text-neutral-700 font-medium">{crumb.label}</span>
                                )}
                            </span>
                        ))}
                    </nav>
                )}
            </div>

            {/* Right: Search + notifications */}
            <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-200 text-neutral-400 text-xs hover:border-neutral-300 hover:text-neutral-600 transition-colors">
                    <Search size={13} />
                    <span>Search…</span>
                    <span className="ml-1 text-[10px] bg-neutral-100 rounded px-1 py-0.5 text-neutral-400">⌘K</span>
                </button>
                <button className="relative flex items-center justify-center w-8 h-8 rounded-md border border-neutral-200 text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 transition-colors">
                    <Bell size={15} />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
                </button>
            </div>
        </header>
    );
}
