import type { SupabaseClient } from '@supabase/supabase-js';

// Function to get token using the existing Supabase client
export async function getValidZohoToken(supabase: SupabaseClient) {
    try {
        // Get the most recent token
        const { data: token, error } = await supabase
            .from('zoho_tokens')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            console.error('Error fetching token:', error);
            return null;
        }

        if (!token) {
            return null;
        }

        // Check if token is expired
        if (new Date(token.expires_at) <= new Date()) {
            console.log('Token expired, needs refresh');
            return null;
        }

        return token.access_token;
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
}

// Store token using the existing Supabase client
export async function storeZohoToken(supabase: SupabaseClient, tokenData: any) {
    try {
        const expiresAt = new Date(Date.now() + tokenData.expires_in * 1000);

        const { error } = await supabase
            .from('zoho_tokens')
            .insert({
                access_token: tokenData.access_token,
                refresh_token: tokenData.refresh_token,
                expires_at: expiresAt.toISOString()
            });

        if (error) {
            console.error('Error storing token:', error);
            throw error;
        }

        return true;
    } catch (error) {
        console.error('Error storing token:', error);
        throw error;
    }
}