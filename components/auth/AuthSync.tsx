'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function AuthSync() {
    const { user, isLoaded } = useUser();

    useEffect(() => {
        const syncUser = async () => {
            if (isLoaded && user) {
                const { error } = await supabase.from('users').upsert({
                    id: user.id,
                    full_name: user.fullName || `${user.firstName} ${user.lastName}`.trim() || 'Anonymous',
                    avatar_url: user.imageUrl,
                    // plan is defaulted to 'starter' in the DB
                });

                if (error) {
                    console.error('Error syncing user to Supabase:', error);
                }
            }
        };

        syncUser();
    }, [user, isLoaded]);

    return null;
}
