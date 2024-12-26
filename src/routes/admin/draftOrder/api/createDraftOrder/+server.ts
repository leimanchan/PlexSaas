import { json } from '@sveltejs/kit'
import { createDraftOrder } from '$lib/components/admin/api/shopify/adminService'

export async function POST({ request }) {
    try {
        const body = await request.json()
        console.log('Server received request body:', body)
        
        const { remainingBalance, formData, originalOrderData } = body
        
        // Validate inputs
        if (!remainingBalance || !formData || !originalOrderData) {
            console.error('Missing required fields:', { remainingBalance, formData, originalOrderData })
            return json({ error: 'Missing required fields' }, { status: 400 })
        }
        
        const response = await createDraftOrder(
            remainingBalance,
            formData,
            originalOrderData
        )
        
        return json(response)
    } catch (error) {
        console.error('Server error:', error)
        return json({ error: error.message }, { status: 500 })
    }
} 