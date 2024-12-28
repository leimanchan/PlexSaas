import { PUBLIC_ZOHO_CLIENT_ID } from '$env/static/public';
import { PRIVATE_ZOHO_CLIENT_SECRET } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { storeZohoToken } from '$lib/components/admin/zoho/+server';

export const load = (async ({ url, locals }) => {
    const code = url.searchParams.get('code');
    
    if (!code) {
        console.error('No code received from Zoho');
        throw redirect(303, '/cliq/auth');
    }

    try {
        console.log('Received code from Zoho:', code);
        
        // Exchange code for token with updated scope
        const tokenResponse = await fetch('https://accounts.zoho.com/oauth/v2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                code,
                client_id: PUBLIC_ZOHO_CLIENT_ID,
                client_secret: PRIVATE_ZOHO_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: 'http://localhost:5173/cliq/callback',
                scope: 'ZohoCliq.Channels.READ,ZohoCliq.Messages.READ'
            }).toString()
        });

        const tokenData = await tokenResponse.json();
        
        // Debug log to see what we're getting from Zoho
        console.log('Token response from Zoho:', tokenData);
        
        if (tokenData.error) {
            console.error('Token error:', tokenData);
            throw new Error(tokenData.error);
        }

        // Store the token using our helper function with the supabase client from locals
        await storeZohoToken(locals.supabaseServiceRole, {
            access_token: tokenData.access_token,
            refresh_token: tokenData.refresh_token || 'placeholder',
            expires_in: tokenData.expires_in || 3600
        });
        
        console.log('Successfully stored token');
        
        // Redirect to the main cliq page after successful token storage
        throw redirect(303, '/cliq');
        
    } catch (error) {
        console.error('Error getting token:', error);
        return {
            error: 'Failed to authenticate with Zoho',
            details: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}) satisfies PageServerLoad;