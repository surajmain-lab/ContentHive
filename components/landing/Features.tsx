import { Zap, Shield, BarChart3, Clock, Users, Globe } from 'lucide-react'

const features = [
    {
        title: 'Rapid Delivery',
        description: 'Get your high-quality content delivered in record time without compromising on depth or accuracy.',
        icon: Zap,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
    },
    {
        title: 'Human-First Quality',
        description: 'Every piece is crafted by expert writers, ensuring a natural tone that resonates with your audience.',
        icon: Users,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
    },
    {
        title: 'SEO Optimized',
        description: 'Built-in SEO best practices to help your content rank higher and drive more organic traffic.',
        icon: BarChart3,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
    },
    {
        title: 'Secure & Private',
        description: 'Your data and content are protected with enterprise-grade security and strict confidentiality.',
        icon: Shield,
        color: 'text-rose-600',
        bg: 'bg-rose-50',
    },
    {
        title: 'Real-time Tracking',
        description: 'Monitor the progress of your orders in real-time through our intuitive client dashboard.',
        icon: Clock,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
    },
    {
        title: 'Global Reach',
        description: 'Content tailored for international audiences with cultural nuances and localized expertise.',
        icon: Globe,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
    },
]

export function Features() {
    return (
        <section id="features" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4 sm:text-5xl">
                        Everything you need for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">premium content</span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        We provide a comprehensive suite of features designed to streamline your content creation process and deliver exceptional results.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-3xl bg-white border border-gray-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className={`inline-flex items-center justify-center p-3 rounded-2xl ${feature.bg} ${feature.color} mb-6 transition-transform duration-300 group-hover:scale-110`}>
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Subtle hover background decoration */}
                            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
