import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { message, image, quoteData } = await request.json();

        // Debug logging
        console.log('Received request:', {
            hasMessage: !!message,
            hasImage: !!image,
            imagePreview: image ? image.substring(0, 50) + '...' : null,
            hasQuoteData: !!quoteData
        });

        // Validate API key
        if (!env.OPENAI_API_KEY) {
            throw new Error('OpenAI API key is not configured');
        }

        const payload = {
            model: 'gpt-4-turbo', // Changed to 3.5-turbo for testing
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
                    content: [
                        {
                            type: 'text',
                            text: `Quote details: ${JSON.stringify(quoteData)}.\nCustomer message: ${message}`
                        },
                        image ? {
                            type: 'image_url',
                            image_url: {
                                url: image,
                                detail: 'auto'  // Let GPT decide the detail level
                            }
                        } : null
                    ].filter(Boolean)  // Remove null if no image
                }
            ],
            max_tokens: 500,
            temperature: 0.7
        };

        // Debug logging
        console.log('Sending payload to OpenAI:', {
            model: payload.model,
            messageCount: payload.messages.length,
            hasImage: !!image,
            contentTypes: payload.messages[1].content.map(c => c.type)
        });

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
        const formattedResponse = result.choices[0].message.content
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/- /g, '• ');

        return json({ response: formattedResponse });

    } catch (error) {
        console.error('Error processing request:', error);
        return json(
            { 
                error: 'Failed to process request',
                details: error.message 
            }, 
            { status: 500 }
        );
    }
};