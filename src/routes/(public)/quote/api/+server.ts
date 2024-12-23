    import { addToShopifyCart, findClosestDepositVariant } from '$lib/components/shared/apiTools/shopify/shopifyService';

// Handle GET requests
export async function GET() {
    return new Response('This is a GET request response!');
}
export async function POST({ request }) {
    try {
        const { totalCost, formData } = await request.json();
        
        // Calculate 20% deposit
        const depositAmount = totalCost * 0.2;
        console.log('Looking for deposit amount:', depositAmount);
        
        // Find the closest variant for the deposit amount
        const { variantId, variant } = await findClosestDepositVariant(depositAmount);
        console.log('Found variant with price:', variant.price);
        
        // Create new formData with just the found variant ID
        const updatedFormData = {
            ...formData,
            merchandiseId: variantId
        };
        
        console.log('Sending to cart with variant:', {
            variantId,
            variantPrice: variant.price
        });

        // Update the addToShopifyCart call to include any necessary headers or options
        const data = await addToShopifyCart(updatedFormData, totalCost);

        return new Response(JSON.stringify(data), { 
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Cart creation error:', error);
        return new Response(JSON.stringify({ 
            error: error.message,
            stack: error.stack
        }), { 
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
