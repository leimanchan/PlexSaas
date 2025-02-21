import { executeGraphQLQuery } from '$lib/components/shared/apiTools/graphQL/graphqlClient';
import { buildGetOrderQuery, DRAFT_ORDER_CREATE_MUTATION } from '$lib/components/admin/api/shopify/adminQueries';

const SHOPIFY_ADMIN_URL = 'https://e04ebb-82.myshopify.com/admin/api/2024-01/graphql.json';
const ADMIN_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_ADMIN_API_KEY;

console.log('SHOPIFY_ADMIN_URL:', SHOPIFY_ADMIN_URL);

export async function getOrderDetails(orderId: string) {
    if (!ADMIN_ACCESS_TOKEN) {
        throw new Error('Shopify admin access token is not set');
    }

    const query = buildGetOrderQuery(orderId);
    
    console.log('Sending request to:', SHOPIFY_ADMIN_URL);

    return executeGraphQLQuery(
        SHOPIFY_ADMIN_URL, 
        ADMIN_ACCESS_TOKEN, 
        query,
        true  // Indicate this is an admin API call
    );
}

export async function createDraftOrder(
  remainingBalance: number,
  formData: any,
  originalOrderData: any
) {
  if (!ADMIN_ACCESS_TOKEN) {
    throw new Error('Shopify admin access token is not set');
  }

  const safeSize = `${formData.width}" x ${formData.height}"`;
  const safeTitle = `Balance Payment for Order ${originalOrderData.name}`.replace(/[^\w\s-]/g, '');

  const mutation = `mutation draftOrderCreate($input: DraftOrderInput!) {
    draftOrderCreate(input: $input) {
      draftOrder {
        id
        lineItems(first: 10) {
          edges {
            node {
              title
              quantity
              originalUnitPrice
              weight {
                value
                unit
              }
              customAttributes {
                key
                value
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }`;

  const requestBody = {
    query: mutation,
    variables: {
      input: {
        lineItems: [{
          title: safeTitle,
          quantity: 1,
          originalUnitPrice: remainingBalance.toFixed(2),
          requiresShipping: true,
          weight: {
            unit: "POUNDS",
            value: 1
          },
          customAttributes: [
            { key: "Original Order", value: originalOrderData.name },
            { key: "Quantity", value: formData.quantity.toString() },
            { key: "Size", value: safeSize },
            { key: "Paper Type", value: formData.paperType },
            { key: "Paper Weight", value: formData.paperWeight },
            { key: "Front Printing", value: formData.frontPrinting },
            { key: "Back Printing", value: formData.backPrinting }
          ]
        }],
        tags: ["balance-payment", originalOrderData.name],
        shippingAddress: {
          address1: "123 Main Street",
          city: "New York",
          province: "NY",
          country: "United States",
          zip: "10001"
        },
        shippingLine: {
          shippingRateHandle: "Economy"
        }
      }
    }
  };

  // Debug logs with full object expansion
  console.log('Full request details:', {
    url: SHOPIFY_ADMIN_URL,
    hasToken: !!ADMIN_ACCESS_TOKEN,
    query: mutation,
    variables: JSON.stringify(requestBody.variables, null, 2),
    requestBody: JSON.stringify(requestBody, null, 2)
  });

  try {
    const response = await executeGraphQLQuery(
      SHOPIFY_ADMIN_URL,
      ADMIN_ACCESS_TOKEN,
      requestBody.query,  // Changed this to use the full requestBody.query
      true,
      requestBody.variables
    );
    console.log('Response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      fullRequestBody: JSON.stringify(requestBody, null, 2),
      fullVariables: JSON.stringify(requestBody.variables, null, 2)
    });
    throw error;
  }
}