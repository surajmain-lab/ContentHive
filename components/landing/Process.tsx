import { ClipboardCheck, Sparkles, Send } from 'lucide-react'

const steps = [
    {
        title: 'Expert Briefing',
        description: 'Provide us with your content goals, audience profile, and brand guidelines through our streamlined onboarding form.',
        icon: ClipboardCheck,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-100',
        shadow: 'shadow-indigo-500/10',
    },
    {
        title: 'Expert Craftsmanship',
        description: 'Our specialized writers and editorial team develop your content, ensuring linguistic precision and strategic alignment.',
        icon: Sparkles,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        shadow: 'shadow-amber-500/10',
    },
    {
        title: 'Rapid Deployment',
        description: 'Receive your polished, publication-ready content directly in your dashboard, formatted and optimized for impact.',
        icon: Send,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
        shadow: 'shadow-emerald-500/10',
    },
]

export function Process() {
    return (
        <section id="process" className="py-24 bg-gray-50/50 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6 sm:text-5xl">
                        Streamlined <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">to perfection</span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Our content production process is engineered for efficiency, quality, and results. Here's how we deliver excellence at scale.
                    </p>
                </div>

                <div className="relative">
                    {/* Connector Line (visible on large screens) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent -translate-y-1/2 -z-10" />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center group"
                            >
                                {/* Step Number Badge */}
                                <div className="mb-8 relative">
                                    <div className={`w-20 h-20 rounded-2xl ${step.bg} ${step.color} border ${step.border} flex items-center justify-center relative z-10 shadow-lg ${step.shadow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                        <step.icon className="w-10 h-10" />
                                    </div>
                                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-sm font-bold text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
                                        0{index + 1}
                                    </div>

                                    {/* Subtle pulse decoration */}
                                    <div className={`absolute inset-0 rounded-2xl ${step.bg} opacity-50 blur-xl group-hover:opacity-80 transition-opacity duration-300 -z-10`} />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight group-hover:translate-y-[-2px] transition-transform duration-300">{step.title}</h3>
                                <p className="text-gray-600 leading-relaxed max-w-sm">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA in the process section */}
                <div className="mt-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm text-gray-600 animate-bounce">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Waitlist currently open for 12 new clients
                    </div>
                </div>
            </div>
        </section>
    )
}
