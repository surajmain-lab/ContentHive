'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { StatusBadge } from '@/components/orders/StatusBadge';
import { EmptyState } from '@/components/shared/EmptyState';

import { formatDate, getPriorityColor } from '@/lib/utils';
import { FileText, Plus, Search, ChevronDown, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import type { OrderStatus, ContentType } from '@/types';
import { supabase } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';

const STATUS_FILTERS: { label: string; value: OrderStatus | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'In Review', value: 'in_review' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Revision', value: 'revision' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Completed', value: 'completed' },
];

const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
    blog: 'Blog Post',
    article: 'Article',
    social: 'Social Media',
    email: 'Email',
    copywriting: 'Copywriting',
    product_description: 'Product Desc.',
    whitepaper: 'Whitepaper',
};

export default function OrdersPage() {
    const { user } = useUser();
    const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;

            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('client_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setOrders(data || []);
            } catch (err) {
                console.error('Error fetching orders:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const filtered = orders.filter((o) => {
        const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
        const matchesSearch = o.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="flex flex-col min-h-screen bg-neutral-100">
            <Header
                title="Orders"
                breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Orders' }]}
            />

            <main className="flex-1 p-6 space-y-4">

                {/* Top bar */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    {/* Search */}
                    <div className="relative flex-1 max-w-xs">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search orders…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 placeholder-neutral-400"
                        />
                    </div>
                    <Link
                        href="/dashboard/orders/new"
                        className="flex items-center gap-2 bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shrink-0"
                    >
                        <Plus size={15} />
                        New Order
                    </Link>
                </div>

                {/* Status Filters */}
                <div className="flex items-center gap-1.5 flex-wrap">
                    {STATUS_FILTERS.map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setStatusFilter(f.value)}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${statusFilter === f.value
                                ? 'bg-[#111111] text-white'
                                : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
                                }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl border border-neutral-200 shadow-card overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-16 gap-2 text-neutral-400">
                            <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            <span className="text-sm">Loading orders…</span>
                        </div>
                    ) : filtered.length === 0 ? (
                        <EmptyState
                            icon={<FileText size={20} />}
                            title="No orders found"
                            description="Try adjusting your filters or place a new order."
                            action={
                                <Link
                                    href="/dashboard/orders/new"
                                    className="flex items-center gap-2 bg-[#EF4444] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#DC2626] transition-colors"
                                >
                                    <Plus size={14} /> Place Order
                                </Link>
                            }
                        />
                    ) : (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-neutral-100 bg-neutral-50">
                                    <th className="text-left text-xs font-medium text-neutral-500 px-5 py-3">
                                        <button className="flex items-center gap-1 hover:text-neutral-800">
                                            Order <ArrowUpDown size={11} />
                                        </button>
                                    </th>
                                    <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3 hidden md:table-cell">Type</th>
                                    <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3 hidden lg:table-cell">Words</th>
                                    <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Status</th>
                                    <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3 hidden lg:table-cell">Priority</th>
                                    <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3 hidden md:table-cell">Due Date</th>
                                    <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3 hidden xl:table-cell">Created</th>
                                    <th className="px-4 py-3" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {filtered.map((order) => (
                                    <tr key={order.id} className="hover:bg-neutral-50 transition-colors group">
                                        <td className="px-5 py-3.5">
                                            <Link href={`/dashboard/orders/${order.id}`} className="block">
                                                <p className="font-medium text-neutral-800 group-hover:text-[#EF4444] transition-colors line-clamp-1">{order.title}</p>
                                                <p className="text-xs text-neutral-400 mt-0.5">{order.id}</p>
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3.5 hidden md:table-cell">
                                            <span className="text-xs text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                                                {CONTENT_TYPE_LABELS[order.content_type as ContentType] || order.content_type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5 text-xs text-neutral-600 hidden lg:table-cell">
                                            {order.word_count.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="px-4 py-3.5 hidden lg:table-cell">
                                            <span className={`text-xs font-medium capitalize ${getPriorityColor(order.priority)}`}>
                                                {order.priority}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5 text-xs text-neutral-500 hidden md:table-cell">
                                            {formatDate(order.due_date)}
                                        </td>
                                        <td className="px-4 py-3.5 text-xs text-neutral-400 hidden xl:table-cell">
                                            {formatDate(order.created_at)}
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <Link
                                                href={`/dashboard/orders/${order.id}`}
                                                className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors flex items-center gap-1"
                                            >
                                                View <ChevronDown size={12} className="-rotate-90" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer count */}
                {filtered.length > 0 && (
                    <p className="text-xs text-neutral-400 text-right">
                        Showing {filtered.length} of {orders.length} orders
                    </p>
                )}

            </main>
        </div>
    );
}
