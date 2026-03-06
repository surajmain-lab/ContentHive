import { Star } from 'lucide-react'

const testimonials = [
    {
        name: 'Sarah Jenkins',
        role: 'CEO at ContentFlow',
        content: 'The quality of content we receive is consistently outstanding. It has completely transformed our organic growth strategy.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
        stars: 5,
    },
    {
        name: 'Michael Chen',
        role: 'Head of Marketing at TechScale',
        content: 'Finding reliable writers who actually understand our industry was a challenge until we found this platform. Highly recommended.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150',
        stars: 5,
    },
    {
        name: 'Alexandra Wright',
        role: 'Founder of Bloom Creative',
        content: 'The turnaround time is incredible. We can now scale our content production without sacrificing the personal touch our clients love.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
        stars: 5,
    },
    {
        name: 'David Miller',
        role: 'Director of Growth at SaaSify',
        content: 'The dashboard makes it so easy to manage dozens of orders simultaneously. It is the most intuitive content platform I have ever used.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150',
        stars: 5,
    },
]

export function Testimonials() {
    return (
        <section id="testimonials" className="py-24 relative overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6 sm:text-5xl">
                            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">industry leaders</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Don't just take our word for it. Join hundreds of satisfied clients who have scaled their content production with us.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 pb-2">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-100 overflow-hidden ring-2 ring-emerald-500/10">
                                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
                                </div>
                            ))}
                            <div className="w-12 h-12 rounded-full border-2 border-white bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-sm ring-2 ring-emerald-500/10">
                                +4k
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-[2.5rem] bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 group flex flex-col"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.stars)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                                ))}
                            </div>

                            <blockquote className="flex-grow">
                                <p className="text-gray-700 leading-relaxed italic mb-8">
                                    "{testimonial.content}"
                                </p>
                            </blockquote>

                            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                                <div className="w-12 h-12 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 shadow-sm border border-white">
                                    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
                                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Subtle background branding */}
                <div className="mt-20 flex flex-wrap items-center justify-center gap-12 opacity-30 grayscale saturate-0 pointer-events-none">
                    <div className="text-2xl font-black tracking-tighter uppercase italic">Forbes</div>
                    <div className="text-2xl font-black tracking-tighter uppercase italic">NYTimes</div>
                    <div className="text-2xl font-black tracking-tighter uppercase italic">Wired</div>
                    <div className="text-2xl font-black tracking-tighter uppercase italic">Medium</div>
                    <div className="text-2xl font-black tracking-tighter uppercase italic">Vogue</div>
                </div>
            </div>
        </section>
    )
}
