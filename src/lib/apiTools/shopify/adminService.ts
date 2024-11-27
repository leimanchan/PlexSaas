import { executeGraphQLQuery } from '$lib/apiTools/graphQL/graphqlClient';
import { buildGetOrderQuery } from '$lib/apiTools/shopify/adminQueries';

const SHOPIFY_ADMIN_URL = 'https://e04ebb-82.myshopify.com/admin/api/2024-01/graphql.json';
const ADMIN_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_ADMIN_API_KEY;

export async function getOrderDetails(orderId: string) {
    if (!ADMIN_ACCESS_TOKEN) {
        throw new Error('Shopify admin access token is not set');
    }

    const query = buildGetOrderQuery(orderId);
    
    return executeGraphQLQuery(
        SHOPIFY_ADMIN_URL, 
        ADMIN_ACCESS_TOKEN, 
        query,
        true  // Indicate this is an admin API call
    );
}