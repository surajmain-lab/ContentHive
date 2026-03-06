import { StatsCard } from '@/components/dashboard/StatsCard';
import { StatusBadge } from '@/components/orders/StatusBadge';
import { mockOrders } from '@/lib/mock-data/orders';
import { formatDate } from '@/lib/utils';
import { FileText, Play, Filter, Share2, Plus, MoreVertical, Search, Clock, CheckCircle, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export default function DashboardPage() {
    const recentOrders = [...mockOrders]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

    return (
        <div className="flex flex-col h-full bg-white text-[#0F172A]">
            {/* Inline Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-100">
                <div>
                    <h1 className="text-xl font-bold">Dashboard</h1>
                    <p className="text-[13px] text-neutral-500 mt-1">Tracking ongoing activities and evaluating performance trends</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 text-[13px] font-medium hover:bg-neutral-50 transition-colors">
                        <Share2 size={15} />
                        Share Tasks
                    </button>
                    <button className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-[13px] font-medium transition-colors">
                        <Plus size={15} />
                        Add Team
                    </button>
                    <div className="ml-2 pl-4 border-l border-neutral-100 h-8 flex items-center">
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: 'w-8 h-8 rounded-lg ring-2 ring-neutral-50'
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            <main className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar p-8">
                <div className="max-w-[1400px] mx-auto space-y-6">

                    {/* Top Row: Stats (Left 2 cols) & Workload (Right 1 col) */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* Stats Cards */}
                        <div className="xl:col-span-2 grid grid-cols-2 gap-4">
                            <StatsCard
                                label="Total Orders"
                                value={86}
                                icon={<FileText size={15} />}
                                trend={{ value: '20%', up: true, text: 'Orders finished last month' }}
                                bgColor="bg-[#F8F9FA]"
                            />
                            <StatsCard
                                label="Overdue Orders"
                                value={25}
                                icon={<Clock size={15} />}
                                trend={{ value: '12%', up: false, text: 'Orders delayed last month' }}
                                bgColor="bg-[#F3FAF2]"
                            />
                            <StatsCard
                                label="Open Orders"
                                value={40}
                                icon={<FileText size={15} />}
                                trend={{ value: '5%', up: true, text: 'Orders opened last month' }}
                                bgColor="bg-[#F4F6FB]"
                            />
                            <StatsCard
                                label="Completed Orders"
                                value={22}
                                icon={<CheckCircle size={15} />}
                                trend={{ value: '20%', up: true, text: 'Orders finished last month' }}
                                bgColor="bg-[#FFF6F3]"
                            />
                        </div>

                        {/* Workload by status */}
                        <div className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col xl:col-span-1 shadow-sm">
                            <div className="flex items-center justify-between xl:mb-6 mb-4">
                                <h3 className="text-[13px] font-semibold flex items-center gap-2">
                                    <span className="w-5 h-5 flex items-center justify-center rounded bg-neutral-100"><Filter size={12} /></span>
                                    Workload by status
                                </h3>
                                <button className="text-neutral-400"><MoreVertical size={14} /></button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-auto">
                                <div className="border border-neutral-100 rounded-xl p-4">
                                    <p className="text-[12px] font-semibold mb-2">Work In Progress</p>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xl font-bold">44%</span>
                                        <span className="text-[10px] bg-neutral-100 px-2 py-0.5 rounded text-neutral-500">28 Days</span>
                                    </div>
                                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden flex">
                                        {/* Faux graph segments */}
                                        {Array.from({ length: 15 }).map((_, i) => (
                                            <div key={i} className={`flex-1 ${i < 8 ? 'bg-indigo-500' : 'bg-transparent'} border-r border-white`} />
                                        ))}
                                    </div>
                                </div>
                                <div className="border border-neutral-100 rounded-xl p-4">
                                    <p className="text-[12px] font-semibold mb-2">Completed</p>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xl font-bold">46%</span>
                                        <span className="text-[10px] bg-neutral-100 px-2 py-0.5 rounded text-neutral-500">28 Days</span>
                                    </div>
                                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden flex">
                                        {Array.from({ length: 15 }).map((_, i) => (
                                            <div key={i} className={`flex-1 ${i < 9 ? 'bg-teal-400' : 'bg-transparent'} border-r border-white`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Row: Timeline Project & Time Tracker */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* Timeline Project */}
                        <div className="xl:col-span-2 bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-[13px] font-semibold flex items-center gap-2">
                                    <span className="w-5 h-5 flex items-center justify-center rounded bg-neutral-100"><Filter size={12} /></span>
                                    Timeline Project
                                </h3>
                                <button className="p-1.5 border border-neutral-200 rounded hover:bg-neutral-50"><Filter size={14} /></button>
                            </div>

                            {/* Dummy Timeline Mockup */}
                            <div className="relative pt-6 pb-2">
                                <div className="flex justify-between text-[11px] text-neutral-400 font-medium mb-4">
                                    <span>07:00AM</span><span>09:00AM</span><span className="text-indigo-500">10:00AM</span><span>12:00PM</span><span>03:00PM</span>
                                </div>
                                <div className="relative h-40 w-full">
                                    {/* background grid */}
                                    <div className="absolute inset-0 flex justify-between">
                                        {[0, 1, 2, 3, 4].map(i => <div key={i} className={`w-0.5 h-full border-r border-dashed ${i === 2 ? 'border-indigo-400' : 'border-neutral-200'}`} />)}
                                        {/* Active time indicator dot at 10AM */}
                                        <div className="absolute left-[50%] -translate-x-1/2 -top-2 w-2 h-2 rounded-full bg-indigo-500" />
                                    </div>
                                    {/* Timeline blocks */}
                                    <div className="absolute top-2 left-[5%] w-[35%] bg-indigo-50 text-indigo-700 text-[11px] font-semibold px-3 py-2 rounded-lg border border-indigo-100 flex items-center gap-2 shadow-sm">
                                        <div className="w-4 h-4 rounded bg-indigo-200 flex items-center justify-center"><FileText size={10} /></div>
                                        Conduct team meeting
                                    </div>
                                    <div className="absolute top-14 left-[15%] w-[25%] bg-teal-50 text-teal-700 text-[11px] font-semibold px-3 py-2 rounded-lg border border-teal-100 flex items-center gap-2 shadow-sm">
                                        <div className="w-4 h-4 rounded bg-teal-200 flex items-center justify-center"><FileText size={10} /></div>
                                        Clients Emails
                                    </div>
                                    <div className="absolute top-2 left-[45%] w-[35%] bg-blue-50 text-blue-700 text-[11px] font-semibold px-3 py-2 rounded-lg border border-blue-100 flex items-center gap-2 shadow-sm">
                                        <div className="w-4 h-4 rounded bg-blue-200 flex items-center justify-center"><FileText size={10} /></div>
                                        Finalize presentations
                                    </div>
                                    <div className="absolute top-24 left-[55%] w-[30%] bg-neutral-100 text-neutral-700 text-[11px] font-semibold px-3 py-2 rounded-lg border border-neutral-200 flex items-center gap-2 shadow-sm">
                                        <div className="w-4 h-4 rounded bg-neutral-200 flex items-center justify-center"><FileText size={10} /></div>
                                        Design Research
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Time Tracker */}
                        <div className="bg-[#F8F9FA] rounded-2xl border border-neutral-200 p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[13px] font-semibold flex items-center gap-2">
                                    <span className="w-5 h-5 flex items-center justify-center rounded bg-white shadow-sm"><Clock size={12} /></span>
                                    Time Tracker
                                </h3>
                                <button className="text-[11px] font-medium bg-white border border-neutral-200 px-3 py-1.5 rounded flex items-center gap-1"><Clock size={12} /> History</button>
                            </div>

                            <div className="bg-white rounded-xl border border-neutral-100 p-5 text-center mt-6 shadow-sm relative">
                                <div className="absolute top-3 left-4 text-[12px] font-medium flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 bg-orange-500 rounded-sm" /> slack.com Redesign
                                </div>
                                <div className="absolute top-3 right-4"><ChevronDown size={14} className="text-neutral-400" /></div>

                                <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-neutral-500 bg-neutral-50 px-2.5 py-1 rounded-full mt-6 mb-3 border border-neutral-100">
                                    <Clock size={12} /> Mon, 23 Apr 2026
                                </div>
                                <h2 className="text-4xl font-bold text-neutral-900 tracking-tight my-2">32:40:10</h2>

                                <div className="flex justify-center gap-3 mt-4">
                                    <button className="flex items-center gap-2 bg-indigo-500 text-white text-[12px] font-medium px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                                        <span className="w-3 h-3 border-2 border-white rounded-sm flex items-center justify-center"><span className="w-0.5 h-1.5 bg-white" /></span> Pause
                                    </button>
                                    <button className="flex items-center gap-2 bg-white border border-neutral-200 text-neutral-700 text-[12px] font-medium px-4 py-2 rounded-lg hover:bg-neutral-50 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-red-500" /> Stop
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-[11px] text-neutral-400 font-medium mb-2 uppercase">Previous Tasks</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><FileText size={14} /></div>
                                        <div>
                                            <p className="text-[12px] font-semibold">Evernote App Redesign</p>
                                            <p className="text-[11px] text-neutral-400">3:14:26</p>
                                        </div>
                                    </div>
                                    <button className="text-neutral-400"><MoreVertical size={14} /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Task List */}
                    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-1">
                        <div className="flex items-center justify-between p-4 border-b border-neutral-100">
                            <h3 className="text-[14px] font-semibold flex items-center gap-2">
                                <span className="w-5 h-5 flex items-center justify-center rounded bg-neutral-100"><FileText size={12} /></span>
                                Task List
                            </h3>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                                    <input type="text" placeholder="Search Task..." className="pl-8 pr-4 py-2 text-[12px] border border-neutral-200 rounded-lg w-48 focus:outline-none focus:border-indigo-500" />
                                </div>
                                <button className="flex items-center gap-2 px-3 py-2 text-[12px] font-medium border border-neutral-200 rounded-lg hover:bg-neutral-50">
                                    All Teams <ChevronDown size={14} />
                                </button>
                                <button className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50"><Filter size={14} /></button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-[13px]">
                                <thead>
                                    <tr className="text-left text-neutral-400 border-b border-neutral-100">
                                        <th className="font-medium p-4 pl-6">Task Name</th>
                                        <th className="font-medium p-4">Priority</th>
                                        <th className="font-medium p-4">Started Date</th>
                                        <th className="font-medium p-4">Assigned To</th>
                                        <th className="font-medium p-4">Due Date</th>
                                        <th className="font-medium p-4">Status</th>
                                        <th className="p-4" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order, i) => (
                                        <tr key={order.id} className="border-b last:border-0 border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                                            <td className="p-4 pl-6">
                                                <div className="flex items-center gap-3">
                                                    <input type="checkbox" className="min-w-4 w-4 h-4 rounded border-neutral-300 accent-indigo-500" />
                                                    <Link href={`/dashboard/orders/${order.id}`} className="font-semibold text-neutral-800 hover:text-indigo-600 transition-colors line-clamp-1">{order.title}</Link>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded uppercase ${order.priority === 'urgent' ? 'text-red-600 bg-red-50' :
                                                    order.priority === 'high' ? 'text-purple-600 bg-purple-50' :
                                                        'text-blue-600 bg-blue-50'
                                                    }`}>
                                                    <span className="text-[10px]">⚑</span> {order.priority}
                                                </span>
                                            </td>
                                            <td className="p-4 text-neutral-500">{formatDate(order.created_at)}</td>
                                            <td className="p-4">
                                                <div className="flex -space-x-2">
                                                    <div className="w-7 h-7 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-neutral-500">JD</div>
                                                    <div className="w-7 h-7 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-500">AS</div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-neutral-500">{formatDate(order.due_date)}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'in_progress' ? 'bg-orange-500' : 'bg-green-500'}`} />
                                                    <span className="capitalize font-medium text-neutral-700">{order.status.replace('_', ' ')}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="text-neutral-400 hover:text-neutral-700"><MoreVertical size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
