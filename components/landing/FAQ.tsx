'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
    {
        question: 'How do you ensure content quality?',
        answer: 'Every piece of content undergoes a multi-stage review process. It starts with strategic alignment, followed by expert writing from a subject matter specialist, and concludes with a rigorous editorial check for grammar, tone, and SEO optimization.',
    },
    {
        question: 'What is your typical turnaround time?',
        answer: 'Our standard turnaround is 48 hours for regular orders. Professional and Enterprise plans offer priority delivery as fast as 24 hours or less for urgent requirements.',
    },
    {
        question: 'Can I request revisions?',
        answer: 'Absolutely. We offer unlimited minor revisions to ensure the content perfectly aligns with your brand voice and expectations. Your satisfaction is our primary metric.',
    },
    {
        question: 'Do you offer custom localized content?',
        answer: 'Yes, we have a network of native writers across various languages and regions who can create culturally nuanced content tailored for specific global markets.',
    },
    {
        question: 'Is my data and strategy confidential?',
        answer: 'We take privacy seriously. All our writers and staff operate under strict NDAs, and our platform uses enterprise-grade encryption to protect your project briefs and data.',
    },
]

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <section id="faq" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6 sm:text-5xl">
                        Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Questions</span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Everything you need to know about our content production process and platform.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`group rounded-3xl border transition-all duration-300 ${openIndex === index
                                    ? 'border-blue-200 bg-blue-50/50 shadow-lg shadow-blue-500/5'
                                    : 'border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
                            >
                                <span className={`text-lg font-bold transition-colors duration-300 ${openIndex === index ? 'text-blue-600' : 'text-gray-900 group-hover:text-blue-600'
                                    }`}>
                                    {faq.question}
                                </span>
                                <div className={`p-2 rounded-xl transition-all duration-300 ${openIndex === index ? 'bg-blue-600 text-white rotate-90' : 'bg-white text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600'
                                    }`}>
                                    {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                </div>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-6 md:p-8 pt-0 text-gray-600 leading-relaxed border-t border-blue-100/50">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-8 rounded-[2.5rem] bg-indigo-600 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700" />
                    <div className="relative z-10 max-w-lg text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2 tracking-tight">Still have questions?</h3>
                        <p className="text-indigo-100 opacity-80">Our dedicated content strategists are ready to help you build your roadmap.</p>
                    </div>
                    <button className="relative z-10 px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:shadow-xl hover:shadow-white/10 transition-all duration-300">
                        Contact Strategy Team
                    </button>
                </div>
            </div>
        </section>
    )
}
