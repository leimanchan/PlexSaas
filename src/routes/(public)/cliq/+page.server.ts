import { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_API_KEY } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { getValidZohoToken } from '$lib/components/admin/zoho/+server';

interface ZohoTokenResponse {
    access_token: string;
    refresh_token: string;
    api_domain: string;
    token_type: string;
    expires_in: number;
}

async function getZohoAccessToken(): Promise<ZohoTokenResponse> {
    const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';
    const params = new URLSearchParams({
        client_id: ZOHO_CLIENT_ID,
        client_secret: ZOHO_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: ZOHO_API_KEY,
        scope: 'ZohoCliq.Messages.READ,ZohoCliq.Attachments.READ,ZohoCliq.Channels.READ'
    });

    const response = await fetch(`${tokenUrl}?${params.toString()}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    return response.json();
}

export const load = (async ({ locals }) => {
    try {
        // Get the token using our helper function
        const token = await getValidZohoToken(locals.supabaseServiceRole);
        
        if (!token) {
            return {
                error: 'No valid token found',
                channels: []
            };
        }

        // Get channels from Zoho Cliq
        const response = await fetch('https://cliq.zoho.com/api/v2/channels', {
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('Channels data:', data);

        return {
            channels: data.channels?.map((channel: any) => ({
                id: channel.channel_id || channel.id,
                name: channel.name,
                description: channel.description
            })) || []
        };
    } catch (error) {
        console.error('Error fetching channels:', error);
        return {
            error: 'Failed to fetch channels',
            channels: []
        };
    }
}) satisfies PageServerLoad;