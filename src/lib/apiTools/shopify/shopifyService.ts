// src/lib/apiTools/shopify/shopifyService.ts
import { executeGraphQLQuery } from '$lib/apiTools/graphQL/graphqlClient';
import { buildCartCreateMutation, buildGetDepositVariantsQuery } from '$lib/apiTools/shopify/shopifyQueries';

async function addToShopifyCart(formData: any, totalCost: number) {
    const shopifyStorefrontUrl = 'https://e04ebb-82.myshopify.com/api/2024-01/graphql';
    const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_KEY;

    if (!storefrontAccessToken) {
        throw new Error('Shopify storefront access token is not set');
    }

    const query = buildCartCreateMutation(formData, totalCost);

    return executeGraphQLQuery(shopifyStorefrontUrl, storefrontAccessToken, query);
}

async function getDepositVariants() {
    const shopifyStorefrontUrl = 'https://e04ebb-82.myshopify.com/api/2024-01/graphql';
    const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_API_KEY;

    if (!storefrontAccessToken) {
        throw new Error('Shopify storefront access token is not set');
    }

    try {
        const query = buildGetDepositVariantsQuery();
        const response = await executeGraphQLQuery(shopifyStorefrontUrl, storefrontAccessToken, query);
        
        console.log('Raw GraphQL Response:', JSON.stringify(response, null, 2));

        if (!response?.data) {
            throw new Error('No data received from Shopify');
        }

        // Combine variants from all available products into a single array
        const allVariants = [
            ...(response.data.product1?.variants?.edges || []),
            ...(response.data.product2?.variants?.edges || []),
            ...(response.data.product3?.variants?.edges || []),
            ...(response.data.product4?.variants?.edges || [])
        ].map((edge: any) => ({
            id: edge.node.id,
            price: parseFloat(edge.node.price.amount)
        }));

        console.log('All variants:', allVariants);

        // Since we're not using availableForSale, we'll consider all variants valid
        if (allVariants.length === 0) {
            throw new Error('No variants found in any product');
        }

        return allVariants;
    } catch (error) {
        console.error('Error in getDepositVariants:', error);
        throw error;
    }
}

async function findClosestDepositVariant(targetPrice: number) {
    try {
        console.log('Finding variant for target price:', targetPrice);

        if (!targetPrice || targetPrice <= 0) {
            throw new Error('Invalid target price');
        }

        const variants = await getDepositVariants();
        
        if (!variants || variants.length === 0) {
            throw new Error('No variants available');
        }

        let closestVariant = null;
        let closestPriceDifference = Infinity;
        let closestVariantId = null;

        for (let variant of variants) {
            const priceDifference = Math.abs(variant.price - targetPrice);
            console.log(`Checking variant: Price ${variant.price}, Difference ${priceDifference}`);
            if (priceDifference < closestPriceDifference) {
                closestPriceDifference = priceDifference;
                closestVariantId = variant.id;
                closestVariant = variant;
            }
        }

        if (!closestVariantId) {
            throw new Error('No suitable variant found');
        }

        console.log('Found closest variant:', { 
            variantId: closestVariantId, 
            variant: closestVariant,
            priceDifference: closestPriceDifference
        });

        return { variantId: closestVariantId, variant: closestVariant };
    } catch (error) {
        console.error('Error in findClosestDepositVariant:', error);
        throw error;
    }
}

export { 
    addToShopifyCart,
    getDepositVariants,
    findClosestDepositVariant
};