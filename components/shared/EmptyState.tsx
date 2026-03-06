import type { ReactNode } from 'react';

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            {icon && (
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-100 text-neutral-400 mb-4">
                    {icon}
                </div>
            )}
            <p className="text-sm font-medium text-neutral-700">{title}</p>
            {description && <p className="text-xs text-neutral-400 mt-1 max-w-xs">{description}</p>}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
