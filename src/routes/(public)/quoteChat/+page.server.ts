import { createDefaultCalculator } from '$lib/quoteEngine/flatPrintingCalculator-v2';

// This simulates the last submitted form data
let lastFormData = {
    quantity: 100,
    width: 8.5,
    height: 11,
    paperType: 'Satin',
    paperWeight: '100lb Text',
    frontPrinting: 'Color',
    backPrinting: 'None'
};

export function load() {
    // Return the last known form data
    return {
        formData: lastFormData
    };
}

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const calculator = createDefaultCalculator();
        
        // Update the lastFormData with new values
        lastFormData = {
            quantity: Number(formData.get('quantity')),
            width: Number(formData.get('width')),
            height: Number(formData.get('height')),
            paperType: String(formData.get('paperType')),
            paperWeight: String(formData.get('paperWeight')),
            frontPrinting: String(formData.get('frontPrinting')),
            backPrinting: String(formData.get('backPrinting'))
        };

        // Calculate the result
        const result = calculator.calculatePrice({
            ...lastFormData,
            frontPrinting: { method: lastFormData.frontPrinting },
            backPrinting: { method: lastFormData.backPrinting }
        });

        return { success: true, result };
    }
};
