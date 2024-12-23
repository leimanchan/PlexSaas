// src/lib/apiTools/graphQL/graphqlClient.ts
export async function executeGraphQLQuery(
    url: string,
    accessToken: string,
    query: string,
    isAdmin = false,
    variables?: Record<string, unknown>
) {
    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(isAdmin 
                ? { 'X-Shopify-Access-Token': accessToken }
                : { 'X-Shopify-Storefront-Access-Token': accessToken }
            )
        };

        // Create the request body exactly like the CURL example
        const requestBody = {
            query,
            variables
        };

        console.log('Final request:', {
            url,
            headers,
            body: JSON.stringify(requestBody, null, 2)
        });

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (data.errors) {
            console.error('GraphQL Response Errors:', JSON.stringify(data.errors, null, 2));
            throw new Error(JSON.stringify(data.errors));
        }

        return data;
    } catch (error) {
        console.error('GraphQL query error:', error);
        throw error;
    }
}
 