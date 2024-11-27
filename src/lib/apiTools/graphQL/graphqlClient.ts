// src/lib/apiTools/graphQL/graphqlClient.ts
export async function executeGraphQLQuery(url: string, token: string, query: string) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': token,
        },
        body: JSON.stringify({ query }),
    });
     if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GraphQL error: ${JSON.stringify(errorData)}`);
    }
     return response.json();
}
 