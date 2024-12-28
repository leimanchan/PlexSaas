import type { PageServerLoad } from './$types';
import { getValidZohoToken } from '$lib/components/admin/zoho/+server';

export const load = (async ({ params, url, locals }) => {
    try {
        const token = await getValidZohoToken(locals.supabaseServiceRole);
        
        if (!token) {
            return {
                error: 'No valid token found',
                messages: []
            };
        }

        // Get channel details
        const channelResponse = await fetch(`https://cliq.zoho.com/api/v2/channels/${params.id}`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const channelData = await channelResponse.json();

        // Calculate date range for the API request
        const range = url.searchParams.get('range') || '5days';
        let startTime, endTime;
        const now = new Date();

        switch(range) {
            case '5days':
                startTime = new Date(now);
                startTime.setDate(now.getDate() - 5);
                break;
            case 'month':
                startTime = new Date(now);
                startTime.setMonth(now.getMonth() - 1);
                break;
            case 'custom':
                const customStart = url.searchParams.get('start');
                const customEnd = url.searchParams.get('end');
                startTime = customStart ? new Date(customStart) : new Date(0);
                endTime = customEnd ? new Date(customEnd) : now;
                break;
            default:
                startTime = new Date(0); // Beginning of time
        }

        // Construct the messages URL with date range
        let messagesUrl = `https://cliq.zoho.com/api/v2/chats/${channelData.chat_id}/messages?limit=50`;
        if (startTime) {
            messagesUrl += `&fromtime=${startTime.getTime()}`;
        }
        if (endTime) {
            messagesUrl += `&totime=${endTime.getTime()}`;
        }

        // Get messages
        const messagesResponse = await fetch(messagesUrl, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const messagesData = await messagesResponse.json();
        const messages = messagesData.data || messagesData.messages || [];
        
        return {
            channel: channelData,
            messages: messages.map((msg: any) => ({
                id: msg.id,
                time: msg.time || msg.created_time,
                sender: {
                    name: msg.sender?.name || msg.user?.name || 'Unknown User'
                },
                content: typeof msg.content === 'string' ? msg.content : 
                        msg.content?.text || 
                        msg.message || 
                        'Content not available',
                image: msg.content?.file?.type?.startsWith('image/') ? {
                    name: msg.content.file.name,
                    url: `/cliq/files/api/cliq/files/${msg.content.file.id}`
                } : null,
                attachments: !msg.content?.file?.type?.startsWith('image/') && msg.content?.file ? [{
                    name: msg.content.file.name,
                    url: `/cliq/files/api/cliq/files/${msg.content.file.id}`
                }] : []
            }))
        };
    } catch (e) {
        console.error('Error fetching channel data:', e);
        return {
            error: 'Failed to fetch channel data',
            channel: null,
            messages: []
        };
    }
}) satisfies PageServerLoad; 