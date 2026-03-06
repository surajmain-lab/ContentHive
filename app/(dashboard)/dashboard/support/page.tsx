import { Header } from '@/components/layout/Header';
import { HelpCircle, MessageCircle, BookOpen, ChevronRight, Mail, Zap } from 'lucide-react';

const FAQ = [
    { q: 'How long does it take to receive my content?', a: 'Most orders are delivered within 2-5 business days, depending on word count and complexity. Urgent orders may be completed sooner.' },
    { q: 'How do revisions work?', a: 'Pro and Enterprise plans include one free revision per order. Simply leave notes in the order detail page and click "Request Revision".' },
    { q: 'What file formats will I receive?', a: 'You\'ll receive a Google Doc link plus a Word (.docx) copy. We can also provide markdown or plain text on request.' },
    { q: 'Can I request a specific writer?', a: 'Enterprise clients can request dedicated writers. Pro clients may request preferences in their order brief.' },
    { q: 'How do I cancel or change an order?', a: 'Orders can be cancelled while in "Pending" status at no charge. Contact support for any changes after writing has begun.' },
];

export default function SupportPage() {
    return (
        <div className="flex flex-col min-h-screen bg-neutral-100">
            <Header
                title="Support"
                breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Support' }]}
            />

            <main className="flex-1 p-6">
                <div className="max-w-2xl mx-auto space-y-4">

                    {/* Contact Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                            { icon: Mail, label: 'Email Support', desc: 'Reply within 4 hours', action: 'Send Email', href: 'mailto:support@contentdesk.io' },
                            { icon: MessageCircle, label: 'Live Chat', desc: 'Mon–Fri, 9am–6pm EST', action: 'Start Chat', href: '#' },
                            { icon: BookOpen, label: 'Help Center', desc: 'Browse all articles', action: 'Browse Docs', href: '#' },
                        ].map(({ icon: Icon, label, desc, action }) => (
                            <div key={label} className="bg-white rounded-xl border border-neutral-200 shadow-card p-4 flex flex-col items-center text-center">
                                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center mb-3">
                                    <Icon size={18} className="text-neutral-500" />
                                </div>
                                <p className="text-sm font-semibold text-neutral-900">{label}</p>
                                <p className="text-xs text-neutral-400 mt-0.5 mb-3">{desc}</p>
                                <button className="w-full py-1.5 rounded-lg bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs font-medium transition-colors">
                                    {action}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Submit Ticket */}
                    <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <HelpCircle size={15} className="text-neutral-400" />
                            <h2 className="text-sm font-semibold text-neutral-900">Submit a Ticket</h2>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-neutral-600 mb-1.5">Subject</label>
                                <input
                                    type="text"
                                    placeholder="Brief description of your issue"
                                    className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 placeholder-neutral-400"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-neutral-600 mb-1.5">Category</label>
                                <select className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 bg-white">
                                    <option>Order Issue</option>
                                    <option>Billing Question</option>
                                    <option>Account & Settings</option>
                                    <option>Content Quality</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-neutral-600 mb-1.5">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="Describe your issue in detail…"
                                    className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 placeholder-neutral-400 resize-none"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button className="flex items-center gap-2 bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                                <Zap size={14} /> Submit Ticket
                            </button>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="bg-white rounded-xl border border-neutral-200 shadow-card">
                        <div className="flex items-center gap-2 px-5 py-4 border-b border-neutral-100">
                            <BookOpen size={14} className="text-neutral-400" />
                            <h2 className="text-sm font-semibold text-neutral-900">Frequently Asked Questions</h2>
                        </div>
                        <div className="divide-y divide-neutral-100">
                            {FAQ.map(({ q, a }) => (
                                <details key={q} className="group px-5 py-4 cursor-pointer">
                                    <summary className="flex items-center justify-between list-none text-sm font-medium text-neutral-800 hover:text-neutral-900">
                                        {q}
                                        <ChevronRight size={14} className="text-neutral-400 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                                    </summary>
                                    <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
