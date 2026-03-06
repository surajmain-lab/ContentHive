export type OrderStatus =
    | 'pending'
    | 'in_review'
    | 'in_progress'
    | 'revision'
    | 'delivered'
    | 'completed'
    | 'cancelled';

export type ContentType =
    | 'blog'
    | 'article'
    | 'social'
    | 'email'
    | 'copywriting'
    | 'product_description'
    | 'whitepaper';

export type Priority = 'low' | 'normal' | 'high' | 'urgent';
export type Tone = 'professional' | 'casual' | 'technical' | 'conversational' | 'persuasive';

export interface Order {
    id: string;
    client_id: string;
    title: string;
    content_type: ContentType;
    word_count: number;
    tone: Tone;
    brief: string;
    attachments: string[];
    status: OrderStatus;
    priority: Priority;
    due_date: string;
    delivered_at?: string;
    created_at: string;
    updated_at: string;
}

export interface OrderRevision {
    id: string;
    order_id: string;
    notes: string;
    file_url?: string;
    version: number;
    created_at: string;
}

export interface OrderMessage {
    id: string;
    order_id: string;
    sender_id: string;
    body: string;
    is_from_team: boolean;
    created_at: string;
}

export interface Invoice {
    id: string;
    client_id: string;
    amount: number;
    currency: string;
    status: 'unpaid' | 'paid' | 'overdue';
    due_date: string;
    paid_at?: string;
    created_at: string;
}

export interface Profile {
    id: string;
    full_name: string;
    company_name?: string;
    avatar_url?: string;
    plan: 'starter' | 'pro' | 'enterprise';
    created_at: string;
}

export interface DashboardStats {
    total_orders: number;
    active_orders: number;
    delivered_this_month: number;
    pending_revisions: number;
}
