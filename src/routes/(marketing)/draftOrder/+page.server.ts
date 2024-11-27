import { getOrderDetails } from '$lib/apiTools/shopify/adminService';

export function load() {
    return {
        formData: {
            quantity: '',
            width: '',
            height: '',
            paperType: 'Satin',
            paperWeight: '100lb Text',
            frontPrinting: 'Color',
            backPrinting: 'None'
        }
    };
}

export const actions = {
    getOrder: async ({ request }) => {
        const formData = await request.formData();
        const orderId = formData.get('orderId');
        
        if (!orderId) {
            return {
                success: false,
                error: 'Order ID is required'
            };
        }

        try {
            const gid = `gid://shopify/Order/${orderId}`;
            const response = await getOrderDetails(gid);
            
            // Add null checks and logging
            console.log('API Response:', response);
            
            if (!response?.data?.order) {
                throw new Error('Order data not found');
            }

            // Extract custom attributes with null checks
            const lineItems = response.data.order.lineItems?.edges || [];
            const firstLineItem = lineItems[0]?.node;
            const customAttributes = firstLineItem?.customAttributes || [];

            console.log('Custom Attributes:', customAttributes);

            // Return both the order data and updated formData
            return {
                success: true,
                orderData: response.data.order,
                formData: {
                    quantity: getAttributeValue(customAttributes, 'Original Quantity', ''),
                    width: getAttributeValue(customAttributes, 'Width', ''),
                    height: getAttributeValue(customAttributes, 'Height', ''),
                    paperType: getAttributeValue(customAttributes, 'Paper Type', 'Satin'),
                    paperWeight: getAttributeValue(customAttributes, 'Paper Weight', '100lb Text'),
                    frontPrinting: getAttributeValue(customAttributes, 'Front Printing', 'Color'),
                    backPrinting: getAttributeValue(customAttributes, 'Back Printing', 'None')
                }
            };
        } catch (error) {
            console.error('Error fetching order:', error);
            return {
                success: false,
                error: error.message || 'Failed to fetch order details'
            };
        }
    }
};

function getAttributeValue(attributes: uknown[], key: string, defaultValue = '') {
    const attribute = attributes.find(attr => attr.key === key);
    return attribute ? attribute.value : defaultValue;
}