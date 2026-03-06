'use client'

import { Mail, MessageSquare, Calendar, CheckCircle2, Clock } from 'lucide-react'

export function FloatingElements() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Top Left: Sticky Note */}
            <div className="absolute top-[15%] left-[5%] md:left-[10%] animate-float-slow rotate-[-6deg]">
                <div className="bg-yellow-100 p-6 shadow-xl w-48 h-48 md:w-60 md:h-60 flex flex-col justify-between border-t-4 border-yellow-200">
                    <p className="text-yellow-800 font-medium text-sm md:text-base italic leading-relaxed">
                        Take notes to keep track of crucial details, and accomplish more tasks with ease.
                    </p>
                    <div className="flex justify-end">
                        <div className="w-4 h-4 rounded-full bg-red-400"></div>
                    </div>
                </div>
            </div>

            {/* Top Right: Reminder Card */}
            <div className="absolute top-[10%] right-[5%] md:right-[12%] animate-float-medium rotate-[4deg]">
                <div className="bg-white p-5 rounded-[2rem] shadow-2xl border border-gray-100 w-64 md:w-72">
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-bold text-gray-900">Reminders</span>
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center p-2">
                            <Clock className="text-gray-400" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Meetings</p>
                            <p className="text-sm font-bold text-gray-800">Today's Meeting</p>
                            <p className="text-xs text-gray-500">Call with marketing team</p>
                            <div className="mt-2 flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg w-fit">
                                <Clock className="w-3 h-3" />
                                13:00 - 13:45
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Left: Tasks Card */}
            <div className="absolute bottom-[10%] left-[8%] md:left-[15%] animate-float-slow rotate-[2deg] hidden lg:block">
                <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl border border-gray-100 w-80">
                    <h3 className="font-bold text-gray-900 mb-6">Today's tasks</h3>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-orange-100 text-orange-600 flex items-center justify-center rounded text-[10px] font-bold">B</div>
                                    <span className="font-semibold text-gray-700">New ideas for campaign</span>
                                </div>
                                <span className="text-gray-400 font-medium">60%</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-400 w-[60%] rounded-full"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-green-100 text-green-600 flex items-center justify-center rounded text-[10px] font-bold">3</div>
                                    <span className="font-semibold text-gray-700">Design PPT #4</span>
                                </div>
                                <span className="text-gray-400 font-medium">112%</span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-400 w-full rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Right: Integrations Card */}
            <div className="absolute bottom-[15%] right-[8%] md:right-[15%] animate-float-medium rotate-[-3deg] hidden lg:block">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 w-80">
                    <h3 className="font-bold text-gray-900 mb-8">100+ Integrations</h3>
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center p-3">
                            <Mail className="text-blue-500 w-full h-full" />
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center p-3">
                            <MessageSquare className="text-green-500 w-full h-full" />
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center p-3">
                            <Calendar className="text-blue-600 w-full h-full" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Center Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-40 animate-pulse">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center p-4 border border-gray-100">
                    <div className="grid grid-cols-2 gap-2 w-full h-full">
                        <div className="bg-blue-500 rounded-full aspect-square"></div>
                        <div className="bg-gray-800 rounded-full aspect-square"></div>
                        <div className="bg-gray-800 rounded-full aspect-square"></div>
                        <div className="bg-gray-800 rounded-full aspect-square"></div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes float {
            0% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
            50% { transform: translateY(-20px) rotate(calc(var(--rotation, 0deg) + 2deg)); }
            100% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
        }
        .animate-float-slow {
            --rotation: -6deg;
            animation: float 6s ease-in-out infinite;
        }
        .animate-float-medium {
            --rotation: 4deg;
            animation: float 5s ease-in-out infinite;
        }
        `}</style>
        </div>
    )
}
