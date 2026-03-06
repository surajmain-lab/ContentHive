import { Sidebar } from '@/components/layout/Sidebar';
import { AuthSync } from '@/components/auth/AuthSync';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex text-[#0F172A]">
            <AuthSync />
            <Sidebar />
            <div className="flex-1 ml-64 flex flex-col min-h-screen p-4 md:p-6 lg:p-8">
                <div className="flex-1 bg-white rounded-[24px] shadow-sm border border-neutral-200/60 overflow-hidden flex flex-col relative w-full h-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
