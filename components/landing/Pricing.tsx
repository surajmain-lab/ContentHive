import { Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const plans = [
    {
        name: 'Starter',
        price: '499',
        description: 'Perfect for startups and small business owners needing consistent, high-quality content.',
        features: [
            '2,500 words per month',
            'SEO optimization included',
            'Standard 48h turnaround',
            'Dashboard access',
            'Single user seat',
        ],
        cta: 'Start with Starter',
        highlight: false,
    },
    {
        name: 'Professional',
        price: '1,299',
        description: 'Ideal for growing teams and agencies scaling their content production strategy.',
        features: [
            '7,500 words per month',
            'Priority SEO & research',
            'Express 24h turnaround',
            'Dedicated editor access',
            'Up to 3 user seats',
            'Custom brand voice mapping',
        ],
        cta: 'Get Professional',
        highlight: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Comprehensive content solutions for large organizations with high-volume needs.',
        features: [
            'Unlimited word count',
            'Full content strategy',
            'Instant turnaround available',
            'API access & integration',
            'Unlimited user seats',
            'White-label options',
        ],
        cta: 'Contact Sales',
        highlight: false,
    },
]

export function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-gray-900 text-white relative overflow-hidden rounded-[3rem] mx-4 mb-24">
            {/* Background radial glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl font-bold tracking-tight mb-6 sm:text-5xl">
                        Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">transparent pricing</span>
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        Choose the plan that perfectly aligns with your growth goals. No hidden fees, no complex contracts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`p-8 rounded-[2.5rem] flex flex-col transition-all duration-300 ${plan.highlight
                                    ? 'bg-gradient-to-b from-blue-600 to-indigo-700 border border-blue-500 shadow-2xl shadow-blue-500/20 scale-105 z-20'
                                    : 'bg-white/5 border border-white/10 hover:bg-white/[0.08]'
                                }`}
                        >
                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-2 tracking-tight">{plan.name}</h3>
                                <p className={`text-sm ${plan.highlight ? 'text-blue-100' : 'text-gray-400'}`}>
                                    {plan.description}
                                </p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black">${plan.price}</span>
                                    {plan.price !== 'Custom' && <span className={`text-sm ${plan.highlight ? 'text-blue-100' : 'text-gray-400'}`}>/mo</span>}
                                </div>
                            </div>

                            <div className="flex-grow space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm">
                                        <div className={`p-1 rounded-full ${plan.highlight ? 'bg-white/20' : 'bg-blue-500/20 text-blue-400'}`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/signup"
                                className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold transition-all duration-300 ${plan.highlight
                                        ? 'bg-white text-blue-600 hover:bg-blue-50 hover:shadow-lg'
                                        : 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-lg shadow-blue-500/20'
                                    }`}
                            >
                                {plan.cta}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center text-gray-400 text-sm">
                    <p>Need a custom localized solution? <Link href="#" className="underline text-blue-400 hover:text-blue-300">Talk to our content strategists</Link></p>
                </div>
            </div>
        </section>
    )
}
