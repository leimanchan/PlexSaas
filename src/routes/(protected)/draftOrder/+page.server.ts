import { getOrderDetails } from '$lib/apiTools/shopify/adminService';
import { createDefaultCalculator } from '$lib/quoteEngine/flatPrintingCalculator-v2';

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
            
            console.log('API Response:', response);
            
            if (!response?.data?.order) {
                throw new Error('Order data not found');
            }

            const lineItems = response.data.order.lineItems?.edges || [];
            const firstLineItem = lineItems[0]?.node;
            const customAttributes = firstLineItem?.customAttributes || [];

            console.log('Custom Attributes:', customAttributes);

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
    },

    calculateQuote: async ({ request }) => {
        const formData = await request.formData();
        const calculator = createDefaultCalculator();
        
        const quoteData = {
            quantity: Number(formData.get('quantity')),
            width: Number(formData.get('width')),
            height: Number(formData.get('height')),
            paperType: String(formData.get('paperType')),
            paperWeight: String(formData.get('paperWeight')),
            frontPrinting: { method: String(formData.get('frontPrinting')) },
            backPrinting: { method: String(formData.get('backPrinting')) }
        };

        console.log('Quote Data:', quoteData);
        const result = calculator.calculatePrice(quoteData);
        console.log('Quote Result:', result);

        return {
            success: true,
            result,
            formData: {
                quantity: quoteData.quantity,
                width: quoteData.width,
                height: quoteData.height,
                paperType: quoteData.paperType,
                paperWeight: quoteData.paperWeight,
                frontPrinting: quoteData.frontPrinting.method,
                backPrinting: quoteData.backPrinting.method
            }
        };
    }
};

function getAttributeValue(attributes: uknown[], key: string, defaultValue = '') {
    const attribute = attributes.find(attr => attr.key === key);
    return attribute ? attribute.value : defaultValue;
}