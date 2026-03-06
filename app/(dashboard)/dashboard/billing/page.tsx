import { Header } from '@/components/layout/Header';
import { mockInvoices } from '@/lib/mock-data/orders';
import { formatDate, formatCurrency } from '@/lib/utils';
import { CreditCard, CheckCircle, Download, Zap } from 'lucide-react';

const PLAN_FEATURES = {
    starter: ['3 orders/month', '500-1000 words per order', 'Blog & Social content', 'Email support'],
    pro: ['10 orders/month', 'Up to 3000 words per order', 'All content types', 'Priority support', 'Revision included'],
    enterprise: ['Unlimited orders', 'Unlimited word count', 'All content types', 'Dedicated manager', '2 free revisions'],
};

export default function BillingPage() {
    const currentPlan = 'pro' as const;

    const getInvoiceStatusStyle = (status: string) => {
        if (status === 'paid') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        if (status === 'overdue') return 'bg-red-50 text-red-600 border-red-200';
        return 'bg-amber-50 text-amber-700 border-amber-200';
    };

    return (
        <div className="flex flex-col min-h-screen bg-neutral-100">
            <Header
                title="Billing"
                breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Billing' }]}
            />

            <main className="flex-1 p-6 space-y-4">
                <div className="max-w-3xl mx-auto space-y-4">

                    {/* Current Plan */}
                    <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <CreditCard size={15} className="text-neutral-400" />
                                <h2 className="text-sm font-semibold text-neutral-900">Current Plan</h2>
                            </div>
                            <span className="px-2.5 py-0.5 text-xs font-semibold bg-[#EF4444] text-white rounded capitalize">
                                {currentPlan}
                            </span>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {(['starter', 'pro', 'enterprise'] as const).map((plan) => (
                                <div
                                    key={plan}
                                    className={`relative rounded-xl border p-4 transition-all ${plan === currentPlan
                                            ? 'border-[#EF4444] bg-red-50'
                                            : 'border-neutral-200 hover:border-neutral-300'
                                        }`}
                                >
                                    {plan === currentPlan && (
                                        <span className="absolute -top-2 left-3 text-[10px] font-semibold bg-[#EF4444] text-white px-2 py-0.5 rounded-full">
                                            Current
                                        </span>
                                    )}
                                    <p className="text-sm font-semibold text-neutral-900 capitalize">{plan}</p>
                                    <p className="text-xl font-bold text-neutral-900 mt-1">
                                        {plan === 'starter' ? '$49' : plan === 'pro' ? '$149' : '$399'}
                                        <span className="text-xs font-normal text-neutral-400">/mo</span>
                                    </p>
                                    <ul className="mt-3 space-y-1.5">
                                        {PLAN_FEATURES[plan].map((feat) => (
                                            <li key={feat} className="flex items-start gap-1.5 text-[11px] text-neutral-600">
                                                <CheckCircle size={11} className="text-emerald-500 mt-0.5 shrink-0" />
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                    {plan !== currentPlan && (
                                        <button className="w-full mt-3 py-1.5 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1">
                                            <Zap size={11} /> {plan === 'enterprise' ? 'Upgrade' : plan === 'starter' ? 'Downgrade' : 'Upgrade'}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <p className="text-xs text-neutral-400">
                            Next billing date: <span className="font-medium text-neutral-600">April 1, 2024</span> · Your card ending in <span className="font-medium text-neutral-600">4242</span>
                        </p>
                    </div>

                    {/* Invoices */}
                    <div className="bg-white rounded-xl border border-neutral-200 shadow-card overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
                            <h2 className="text-sm font-semibold text-neutral-900">Invoice History</h2>
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-neutral-100 bg-neutral-50">
                                    <th className="text-left text-xs font-medium text-neutral-500 px-5 py-3">Invoice</th>
                                    <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Amount</th>
                                    <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3">Status</th>
                                    <th className="text-left text-xs font-medium text-neutral-500 px-4 py-3 hidden md:table-cell">Due Date</th>
                                    <th className="px-4 py-3" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {mockInvoices.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-neutral-50 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <p className="text-sm font-medium text-neutral-800">{inv.id.toUpperCase()}</p>
                                            <p className="text-xs text-neutral-400">{formatDate(inv.created_at)}</p>
                                        </td>
                                        <td className="px-4 py-3.5 font-medium text-neutral-800">
                                            {formatCurrency(inv.amount, inv.currency)}
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border capitalize ${getInvoiceStatusStyle(inv.status)}`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5 text-xs text-neutral-500 hidden md:table-cell">
                                            {formatDate(inv.due_date)}
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <button className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-700 transition-colors">
                                                <Download size={12} /> PDF
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
