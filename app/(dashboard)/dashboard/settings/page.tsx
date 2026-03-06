import { Header } from '@/components/layout/Header';
import { mockProfile } from '@/lib/mock-data/orders';
import { User, Lock, Bell, AlertTriangle, ChevronRight } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-neutral-100">
            <Header
                title="Settings"
                breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Settings' }]}
            />

            <main className="flex-1 p-6">
                <div className="max-w-2xl mx-auto space-y-4">

                    {/* Profile Section */}
                    <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <User size={15} className="text-neutral-400" />
                            <h2 className="text-sm font-semibold text-neutral-900">Profile Information</h2>
                        </div>

                        {/* Avatar */}
                        <div className="flex items-center gap-4 mb-6 pb-5 border-b border-neutral-100">
                            <div className="w-14 h-14 rounded-full bg-[#EF4444] text-white text-lg font-semibold flex items-center justify-center shrink-0">
                                {mockProfile.full_name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-neutral-800">{mockProfile.full_name}</p>
                                <p className="text-xs text-neutral-400">{mockProfile.company_name}</p>
                                <button className="mt-1.5 text-xs text-[#EF4444] hover:text-[#DC2626] font-medium transition-colors">
                                    Change photo
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-neutral-600 mb-1.5">First Name</label>
                                    <input
                                        defaultValue="Alex"
                                        className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-neutral-600 mb-1.5">Last Name</label>
                                    <input
                                        defaultValue="Johnson"
                                        className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-neutral-600 mb-1.5">Company Name</label>
                                <input
                                    defaultValue={mockProfile.company_name}
                                    className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-neutral-600 mb-1.5">Email Address</label>
                                <input
                                    defaultValue="alex@wavespace.agency"
                                    type="email"
                                    className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-5 pt-4 border-t border-neutral-100">
                            <button className="bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <Lock size={15} className="text-neutral-400" />
                            <h2 className="text-sm font-semibold text-neutral-900">Change Password</h2>
                        </div>
                        <div className="space-y-3">
                            {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
                                <div key={label}>
                                    <label className="block text-xs font-medium text-neutral-600 mb-1.5">{label}</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-3 py-2.5 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 placeholder-neutral-300"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-5 pt-4 border-t border-neutral-100">
                            <button className="border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                                Update Password
                            </button>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white rounded-xl border border-neutral-200 shadow-card p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <Bell size={15} className="text-neutral-400" />
                            <h2 className="text-sm font-semibold text-neutral-900">Notifications</h2>
                        </div>
                        <div className="space-y-0 divide-y divide-neutral-100">
                            {[
                                { label: 'Order Status Updates', desc: 'When your order status changes', defaultOn: true },
                                { label: 'Delivery Notifications', desc: 'When content is delivered', defaultOn: true },
                                { label: 'Revision Requests', desc: 'When a revision is processed', defaultOn: true },
                                { label: 'Invoice Reminders', desc: 'When an invoice is due', defaultOn: false },
                                { label: 'Team Messages', desc: 'When someone messages on an order', defaultOn: true },
                                { label: 'Marketing & News', desc: 'Product updates and promotions', defaultOn: false },
                            ].map(({ label, desc, defaultOn }) => (
                                <div key={label} className="flex items-center justify-between py-3">
                                    <div>
                                        <p className="text-sm font-medium text-neutral-800">{label}</p>
                                        <p className="text-xs text-neutral-400">{desc}</p>
                                    </div>
                                    <button
                                        className={`relative w-9 h-5 rounded-full transition-colors ${defaultOn ? 'bg-[#EF4444]' : 'bg-neutral-200'}`}
                                    >
                                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${defaultOn ? 'translate-x-4' : 'translate-x-0.5'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-white rounded-xl border border-red-100 shadow-card p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle size={15} className="text-red-400" />
                            <h2 className="text-sm font-semibold text-red-600">Danger Zone</h2>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-neutral-800">Delete Account</p>
                                <p className="text-xs text-neutral-400">Permanently delete your account and all data</p>
                            </div>
                            <button className="border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                                Delete <ChevronRight size={12} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
