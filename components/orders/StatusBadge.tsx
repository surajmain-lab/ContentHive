import { cn } from '@/lib/utils';
import { getStatusLabel, getStatusColor } from '@/lib/utils';
import type { OrderStatus } from '@/types';

interface StatusBadgeProps {
    status: OrderStatus;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
                getStatusColor(status),
                className
            )}
        >
            {getStatusLabel(status)}
        </span>
    );
}
