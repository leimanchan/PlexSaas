import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { message, quoteData } = await request.json();

        // Debug logging
        console.log('Environment check:', {
            apiKeyExists: !!env.OPENAI_API_KEY,
            apiKeyLength: env.OPENAI_API_KEY?.length,
            message,
            quoteData
        });

        // Validate API key
        if (!env.OPENAI_API_KEY) {
            throw new Error('OpenAI API key is not configured');
        }

        const payload = {
            model: 'gpt-4o-mini', // Changed to 3.5-turbo for testing
            messages: [
                {
                    role: 'system',
                    content: `You are a friendly and professional printing quote assistant. Help customers understand their quotes and suggest improvements.
                    Format your responses using markdown for better readability:
                    - Use bullet points for lists
                    - Use bold (**text**) for emphasis
                    - Use line breaks between sections
                    - Use numbered lists for steps`
                },
                {
                    role: 'user',
                    content: `Quote details: ${JSON.stringify(quoteData)}. Customer message: ${message}`
                }
            ],
            temperature: 0.7
        };

        // Debug logging
        console.log('Request payload:', JSON.stringify(payload, null, 2));

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.OPENAI_API_KEY}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenAI API Error:', {
                status: response.status,
                statusText: response.statusText,
                errorText
            });
            throw new Error(`OpenAI API request failed: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        // Process the response to preserve newlines and formatting
        const formattedResponse = result.choices[0].message.content
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/- /g, '• ');

        return json({ response: formattedResponse });

    } catch (error) {
        console.error('Detailed error:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
            cause: error.cause
        });

        return json(
            { 
                error: 'Failed to process request',
                details: error.message 
            }, 
            { status: 500 }
        );
    }
};