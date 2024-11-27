// src/lib/apiTools/graphQL/graphqlClient.ts
export async function executeGraphQLQuery(
    url: string, 
    accessToken: string, 
    query: string,
    isAdminAPI: boolean = false
) {
    // Set up headers based on API type
    const headers = isAdminAPI ? {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
    } : {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken
    };

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
        throw new Error(JSON.stringify({ errors: data.errors }));
    }

    return data;
}
 