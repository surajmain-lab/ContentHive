import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { OrderStatus, Priority } from '@/types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(date));
}

export function formatRelativeDate(date: string | Date): string {
    const now = new Date();
    const d = new Date(date);
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return formatDate(date);
}

export function formatCurrency(amount: number, currency = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    }).format(amount);
}

export function getStatusLabel(status: OrderStatus): string {
    const labels: Record<OrderStatus, string> = {
        pending: 'Pending',
        in_review: 'In Review',
        in_progress: 'In Progress',
        revision: 'Revision',
        delivered: 'Delivered',
        completed: 'Completed',
        cancelled: 'Cancelled',
    };
    return labels[status];
}

export function getStatusColor(status: OrderStatus): string {
    const colors: Record<OrderStatus, string> = {
        pending: 'bg-amber-50 text-amber-700 border-amber-200',
        in_review: 'bg-violet-50 text-violet-700 border-violet-200',
        in_progress: 'bg-blue-50 text-blue-700 border-blue-200',
        revision: 'bg-orange-50 text-orange-700 border-orange-200',
        delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        completed: 'bg-neutral-100 text-neutral-600 border-neutral-200',
        cancelled: 'bg-red-50 text-red-700 border-red-200',
    };
    return colors[status];
}

export function getPriorityColor(priority: Priority): string {
    const colors: Record<Priority, string> = {
        low: 'text-neutral-400',
        normal: 'text-blue-500',
        high: 'text-orange-500',
        urgent: 'text-red-500',
    };
    return colors[priority];
}

export function getStatusProgress(status: OrderStatus): number {
    const progress: Record<OrderStatus, number> = {
        pending: 10,
        in_review: 25,
        in_progress: 60,
        revision: 75,
        delivered: 90,
        completed: 100,
        cancelled: 0,
    };
    return progress[status];
}
