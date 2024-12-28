import { getValidZohoToken } from '$lib/components/admin/zoho/+server';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals }) => {
    try {
        const token = await getValidZohoToken(locals.supabaseServiceRole);
        
        if (!token) {
            throw error(401, 'No valid token found');
        }

        const response = await fetch(`https://cliq.zoho.com/api/v2/files/${params.id}`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`
            }
        });

        if (!response.ok) {
            throw error(response.status, 'Failed to fetch file');
        }

        // Forward the content type and other relevant headers
        const headers = new Headers();
        response.headers.forEach((value, key) => {
            headers.set(key, value);
        });

        return new Response(response.body, {
            status: 200,
            headers
        });
    } catch (e) {
        console.error('Error fetching file:', e);
        throw error(500, 'Failed to fetch file');
    }
}; 