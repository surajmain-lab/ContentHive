import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { MoreVertical, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
    label: string;
    value: string | number;
    icon?: ReactNode;
    trend?: { value: string; up: boolean; text: string };
    bgColor?: string;
    className?: string;
}

export function StatsCard({ label, value, icon, trend, bgColor = 'bg-white', className }: StatsCardProps) {
    return (
        <div className={cn('rounded-2xl p-5 relative overflow-hidden', bgColor, className)}>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    {icon && <span className="text-neutral-500">{icon}</span>}
                    <p className="text-[13px] font-semibold text-neutral-800">{label}</p>
                </div>
                <button className="text-neutral-400 hover:text-neutral-700 transition-colors">
                    <MoreVertical size={14} />
                </button>
            </div>
            <div className="flex items-end gap-3 mt-4">
                <p className="text-3xl font-bold text-neutral-900">{value}</p>
                {trend && (
                    <div className={cn('flex items-center gap-1 text-[11px] font-bold px-1.5 py-0.5 rounded mb-1', trend.up ? 'bg-indigo-500/10 text-indigo-500' : 'bg-red-500/10 text-red-500')}>
                        {trend.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {trend.value}
                    </div>
                )}
            </div>
            {trend?.text && (
                <p className="text-[11px] font-medium text-neutral-500 mt-2">{trend.text}</p>
            )}
        </div>
    );
}
