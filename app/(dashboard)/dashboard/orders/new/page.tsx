'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Upload } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const STEPS = ['Content Details', 'Brief & Requirements', 'Review & Submit'];

const CONTENT_TYPES = [
    { value: 'blog', label: 'Blog Post', desc: 'Long-form educational content' },
    { value: 'article', label: 'Article', desc: 'News or opinion pieces' },
    { value: 'social', label: 'Social Media', desc: 'Platform-ready posts' },
    { value: 'email', label: 'Email', desc: 'Newsletters & campaigns' },
    { value: 'copywriting', label: 'Copywriting', desc: 'Sales & landing page copy' },
    { value: 'whitepaper', label: 'Whitepaper', desc: 'In-depth technical reports' },
];

const WORD_COUNTS = ['300', '500', '800', '1000', '1500', '2000', '2500', '5000'];
const TONES = ['professional', 'casual', 'technical', 'conversational', 'persuasive'];
const PRIORITIES = [
    { value: 'low', label: 'Low', color: 'text-neutral-500' },
    { value: 'normal', label: 'Normal', color: 'text-blue-500' },
    { value: 'high', label: 'High', color: 'text-orange-500' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-500' },
];

export default function NewOrderPage() {
    const router = useRouter();
    const { user } = useUser();
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: '',
        content_type: '',
        word_count: '1000',
        priority: 'normal',
        due_date: '',
        tone: 'professional',
        keywords: '',
        target_audience: '',
        brief: '',
    });

    const set = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

    const canAdvance = () => {
        if (step === 0) return form.title && form.content_type && form.due_date;
        if (step === 1) return form.brief.length >= 20;
        return true;
    };

    const handleSubmit = async () => {
        if (!user) {
            toast.error('You must be signed in to place an order');
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.from('orders').insert({
                client_id: user.id,
                title: form.title,
                content_type: form.content_type,
                word_count: parseInt(form.word_count),
                tone: form.tone,
                brief: form.brief,
                priority: form.priority,
                due_date: form.due_date,
                status: 'pending',
            });

            if (error) throw error;

            toast.success('Order placed successfully!');
            router.push('/dashboard/orders?submitted=1');
        } catch (err: any) {
            console.error('Error submitting order:', err);
            toast.error(err.message || 'Failed to submit order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-neutral-100">
            <Header
                title="New Order"
                breadcrumbs={[
                    { label: 'Dashboard', href: '/dashboard' },
                    { label: 'Orders', href: '/dashboard/orders' },
                    { label: 'New Order' },
                ]}
            />

            <main className="flex-1 p-6">
                <div className="max-w-3xl mx-auto space-y-5">

                    {/* Step indicator */}
                    <div className="flex items-center gap-0">
                        {STEPS.map((label, i) => (
                            <div key={i} className="flex items-center flex-1">
                                <div className="flex flex-col items-center flex-1">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all ${i < step ? 'bg-[#EF4444] border-[#EF4444] text-white'
                                        : i === step ? 'border-[#EF4444] text-[#EF4444] bg-white'
                                            : 'border-neutral-200 text-neutral-400 bg-white'
                                        }`}>
                                        {i < step ? <Check size={13} /> : i + 1}
                                    </div>
                                    <p className={`text-[10px] mt-1 font-medium ${i === step ? 'text-neutral-800' : 'text-neutral-400'}`}>{label}</p>
                                </div>
                                {i < STEPS.length - 1 && (
                                    <div className={`h-0.5 flex-1 mx-2 mb-3 ${i < step ? 'bg-[#EF4444]' : 'bg-neutral-200'}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step 0: Content Details */}
                    {step === 0 && (
                        <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-6 space-y-5">
                            <div>
                                <p className="text-sm font-semibold text-neutral-900">Welcome To The New Order Page</p>
                                <p className="text-xs text-neutral-500 mt-0.5">Fill in the details below to place your content order.</p>
                            </div>

                            {/* Order Title */}
                            <div>
                                <label className="block text-xs font-medium text-neutral-600 mb-1.5">Order Title *</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Blog Post: 10 Tips for Better Productivity"
                                    value={form.title}
                                    onChange={e => set('title', e.target.value)}
                                    className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 placeholder-neutral-400"
                                />
                            </div>

                            {/* Content Type */}
                            <div>
                                <label className="block text-xs font-medium text-neutral-600 mb-1.5">Content Type *</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {CONTENT_TYPES.map(ct => (
                                        <button
                                            key={ct.value}
                                            onClick={() => set('content_type', ct.value)}
                                            className={`text-left px-3 py-2.5 rounded-lg border text-sm transition-all ${form.content_type === ct.value
                                                ? 'border-[#EF4444] bg-red-50 text-[#EF4444]'
                                                : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                                                }`}
                                        >
                                            <p className="font-medium text-xs">{ct.label}</p>
                                            <p className="text-[11px] text-neutral-400 mt-0.5">{ct.desc}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Word Count + Priority */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-neutral-600 mb-1.5">Word Count</label>
                                    <select
                                        value={form.word_count}
                                        onChange={e => set('word_count', e.target.value)}
                                        className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 bg-white"
                                    >
                                        {WORD_COUNTS.map(w => <option key={w} value={w}>{parseInt(w).toLocaleString()} words</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-neutral-600 mb-1.5">Priority</label>
                                    <select
                                        value={form.priority}
                                        onChange={e => set('priority', e.target.value)}
                                        className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 bg-white"
                                    >
                                        {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Due Date */}
                            <div>
                                <label className="block text-xs font-medium text-neutral-600 mb-1.5">Due Date *</label>
                                <input
                                    type="date"
                                    value={form.due_date}
                                    onChange={e => set('due_date', e.target.value)}
                                    className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 bg-white"
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 1: Brief & Requirements */}
                    {step === 1 && (
                        <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-6 space-y-5">
                            <div>
                                <p className="text-sm font-semibold text-neutral-900">Brief & Requirements</p>
                                <p className="text-xs text-neutral-500 mt-0.5">The more detail you provide, the better your content will be.</p>
                            </div>

                            {/* Tone */}
                            <div>
                                <label className="block text-xs font-medium text-neutral-600 mb-1.5">Tone of Voice</label>
                                <div className="flex flex-wrap gap-2">
                                    {TONES.map(t => (
                                        <button
                                            key={t}
                                            onClick={() => set('tone', t)}
                                            className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${form.tone === t
                                                ? 'bg-[#111111] text-white'
                                                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Keywords */}
                            <div>
                                <label className="block text-xs font-medium text-neutral-600 mb-1.5">Target Keywords</label>
                                <input
                                    type="text"
                                    placeholder="e.g. remote work, productivity tips, home office"
                                    value={form.keywords}
                                    onChange={e => set('keywords', e.target.value)}
                                    className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 placeholder-neutral-400"
                                />
                            </div>

                            {/* Target Audience */}
                            <div>
                                <label className="block text-xs font-medium text-neutral-600 mb-1.5">Target Audience</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Small business owners, 30-50, tech-savvy"
                                    value={form.target_audience}
                                    onChange={e => set('target_audience', e.target.value)}
                                    className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 placeholder-neutral-400"
                                />
                            </div>

                            {/* Brief */}
                            <div>
                                <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                                    Brief / Instructions *
                                    <span className="text-neutral-400 font-normal ml-1">({form.brief.length} chars, min 20)</span>
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="Describe what you need — key points to cover, structure, references, any specific requirements…"
                                    value={form.brief}
                                    onChange={e => set('brief', e.target.value)}
                                    className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 placeholder-neutral-400 resize-none"
                                />
                            </div>

                            {/* Attachments */}
                            <div>
                                <label className="block text-xs font-medium text-neutral-600 mb-1.5">Attachments (Optional)</label>
                                <div className="flex items-center justify-center w-full border-2 border-dashed border-neutral-200 rounded-lg py-6 cursor-pointer hover:border-neutral-300 transition-colors">
                                    <div className="flex flex-col items-center gap-1.5">
                                        <Upload size={18} className="text-neutral-400" />
                                        <p className="text-xs text-neutral-500">Drop files or <span className="text-[#EF4444] font-medium">browse</span></p>
                                        <p className="text-[10px] text-neutral-400">PDF, DOC, DOCX up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Review */}
                    {step === 2 && (
                        <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-6 space-y-4">
                            <p className="text-sm font-semibold text-neutral-900">Review Your Order</p>
                            <p className="text-xs text-neutral-500">Please check everything is correct before submitting.</p>

                            <dl className="divide-y divide-neutral-100">
                                {[
                                    { label: 'Title', value: form.title },
                                    { label: 'Content Type', value: form.content_type.replace('_', ' ') },
                                    { label: 'Word Count', value: `${parseInt(form.word_count).toLocaleString()} words` },
                                    { label: 'Tone', value: form.tone },
                                    { label: 'Priority', value: form.priority },
                                    { label: 'Due Date', value: form.due_date || '—' },
                                    { label: 'Keywords', value: form.keywords || '—' },
                                    { label: 'Target Audience', value: form.target_audience || '—' },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex justify-between gap-4 py-2.5">
                                        <dt className="text-xs text-neutral-500">{label}</dt>
                                        <dd className="text-xs font-medium text-neutral-800 text-right capitalize">{value}</dd>
                                    </div>
                                ))}
                            </dl>

                            {form.brief && (
                                <div className="border-t border-neutral-100 pt-4">
                                    <p className="text-xs font-medium text-neutral-500 mb-1.5">Brief</p>
                                    <p className="text-sm text-neutral-700 leading-relaxed">{form.brief}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => step > 0 ? setStep(s => s - 1) : router.push('/dashboard/orders')}
                            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                        >
                            <ArrowLeft size={14} />
                            {step === 0 ? 'Cancel' : 'Back'}
                        </button>
                        <button
                            onClick={() => step < 2 ? setStep(s => s + 1) : handleSubmit()}
                            disabled={!canAdvance()}
                            className="flex items-center gap-2 bg-[#EF4444] hover:bg-[#DC2626] disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
                        >
                            {step === 2 ? 'Submit Order' : 'Continue'}
                            {step < 2 && <ArrowRight size={14} />}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
