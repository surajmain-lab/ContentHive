import { Header } from '@/components/layout/Header';
import { StatusBadge } from '@/components/orders/StatusBadge';
import { mockOrders } from '@/lib/mock-data/orders';
import { formatDate, getStatusProgress, getPriorityColor } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, FileText, MessageSquare, RefreshCw, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const TIMELINE_EVENTS = [
    { icon: CheckCircle2, label: 'Order Placed', date: '2024-03-01', done: true },
    { icon: CheckCircle2, label: 'Under Review', date: '2024-03-02', done: true },
    { icon: CheckCircle2, label: 'Writing in Progress', date: '2024-03-03', done: true },
    { icon: Circle, label: 'Delivered to Client', date: '-', done: false },
    { icon: Circle, label: 'Completed', date: '-', done: false },
];

const CONTENT_TYPE_LABELS: Record<string, string> = {
    blog: 'Blog Post', article: 'Article', social: 'Social Media',
    email: 'Email', copywriting: 'Copywriting',
    product_description: 'Product Description', whitepaper: 'Whitepaper',
};

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const order = mockOrders.find((o) => o.id === id);
    if (!order) notFound();

    const progress = getStatusProgress(order.status);

    return (
        <div className="flex flex-col min-h-screen bg-neutral-100">
            <Header
                title="Order Detail"
                breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Orders', href: '/dashboard/orders' },
                    { label: order.id },
                ]}
            />

            <main className="flex-1 p-6 space-y-4">

                {/* Back + Title */}
                <div className="flex items-start gap-3">
                    <Link href="/dashboard/orders" className="flex items-center justify-center w-8 h-8 rounded-lg border border-neutral-200 bg-white text-neutral-500 hover:text-neutral-800 hover:border-neutral-300 transition-colors shrink-0 mt-0.5">
                        <ArrowLeft size={14} />
                    </Link>
                    <div className="flex-1">
                        <h2 className="text-base font-semibold text-neutral-900 leading-snug">{order.title}</h2>
                        <p className="text-xs text-neutral-400 mt-0.5">{order.id} · Created {formatDate(order.created_at)}</p>
                    </div>
                    <StatusBadge status={order.status} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-4">

                        {/* Progress */}
                        <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold text-neutral-900">Progress</h3>
                                <span className="text-sm font-medium text-neutral-700">{progress}%</span>
                            </div>
                            <div className="w-full bg-neutral-100 rounded-full h-2 mb-4">
                                <div
                                    className="h-2 rounded-full bg-[#EF4444] transition-all"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            {/* Timeline */}
                            <div className="flex items-center gap-0">
                                {TIMELINE_EVENTS.map((event, i) => {
                                    const Icon = event.icon;
                                    return (
                                        <div key={i} className="flex-1 flex flex-col items-center">
                                            <div className="flex items-center w-full">
                                                {i > 0 && <div className={`flex-1 h-0.5 ${event.done ? 'bg-[#EF4444]' : 'bg-neutral-200'}`} />}
                                                <Icon size={16} className={event.done ? 'text-[#EF4444]' : 'text-neutral-300'} />
                                                {i < TIMELINE_EVENTS.length - 1 && <div className={`flex-1 h-0.5 ${TIMELINE_EVENTS[i + 1]?.done ? 'bg-[#EF4444]' : 'bg-neutral-200'}`} />}
                                            </div>
                                            <p className="text-[10px] text-neutral-500 mt-1.5 text-center leading-tight">{event.label}</p>
                                            <p className="text-[10px] text-neutral-300">{event.date}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Brief */}
                        <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-5">
                            <h3 className="text-sm font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                                <FileText size={14} className="text-neutral-400" /> Brief
                            </h3>
                            <p className="text-sm text-neutral-600 leading-relaxed">{order.brief}</p>
                        </div>

                        {/* Messages */}
                        <div className="bg-white rounded-xl border border-neutral-200 shadow-card">
                            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
                                <h3 className="text-sm font-semibold text-neutral-900 flex items-center gap-2">
                                    <MessageSquare size={14} className="text-neutral-400" /> Messages
                                </h3>
                            </div>
                            <div className="p-5">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-7 h-7 rounded-full bg-neutral-200 text-neutral-600 text-xs flex items-center justify-center shrink-0 font-medium">T</div>
                                    <div className="flex-1 bg-neutral-50 rounded-lg px-3 py-2.5">
                                        <p className="text-xs font-medium text-neutral-700">Team · {formatDate('2024-03-02')}</p>
                                        <p className="text-sm text-neutral-600 mt-1">We've received your order and have started reviewing your brief. We'll begin writing shortly!</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <input
                                        type="text"
                                        placeholder="Send a message to the team…"
                                        className="flex-1 text-sm px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 placeholder-neutral-400 bg-white"
                                    />
                                    <button className="px-3 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-medium rounded-lg transition-colors shrink-0">
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar info */}
                    <div className="space-y-4">

                        {/* Order Details */}
                        <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-5">
                            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Order Details</h3>
                            <dl className="space-y-2.5">
                                {[
                                    { label: 'Content Type', value: CONTENT_TYPE_LABELS[order.content_type] },
                                    { label: 'Word Count', value: `${order.word_count.toLocaleString()} words` },
                                    { label: 'Tone', value: order.tone.charAt(0).toUpperCase() + order.tone.slice(1) },
                                    { label: 'Priority', value: <span className={`capitalize font-medium ${getPriorityColor(order.priority)}`}>{order.priority}</span> },
                                    { label: 'Due Date', value: formatDate(order.due_date) },
                                    { label: 'Last Updated', value: formatDate(order.updated_at) },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex justify-between gap-2">
                                        <dt className="text-xs text-neutral-500">{label}</dt>
                                        <dd className="text-xs font-medium text-neutral-800 text-right">{value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        {/* Actions */}
                        <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-4 space-y-2">
                            <h3 className="text-sm font-semibold text-neutral-900 mb-2">Actions</h3>
                            {order.status === 'delivered' && (
                                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors">
                                    <CheckCircle2 size={14} /> Approve Delivery
                                </button>
                            )}
                            {['delivered', 'in_progress'].includes(order.status) && (
                                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-neutral-200 text-neutral-700 text-sm hover:bg-neutral-50 transition-colors">
                                    <RefreshCw size={14} /> Request Revision
                                </button>
                            )}
                            {order.status === 'pending' && (
                                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-red-200 text-red-600 text-sm hover:bg-red-50 transition-colors">
                                    <AlertCircle size={14} /> Cancel Order
                                </button>
                            )}
                            <Link
                                href="/dashboard/support"
                                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-neutral-200 text-neutral-600 text-sm hover:bg-neutral-50 transition-colors"
                            >
                                <MessageSquare size={14} /> Get Help
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
