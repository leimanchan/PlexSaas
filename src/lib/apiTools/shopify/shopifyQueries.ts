// src/lib/apiTools/shopify/shopifyQueries.ts

export function buildCartCreateMutation(formData: unknown, totalCost: number): string {
    return `
        mutation {
            cartCreate(
                input: {
                    lines: [
                        {
                            merchandiseId: "${formData.merchandiseId}",
                            quantity: 1,
                            attributes: [
                                { key: "Note", value: "For your consultation and file review, we'll have the specifications below in mind." },
                                { key: "Original Quantity", value: "${formData.quantity}" },
                                { key: "Width", value: "${formData.width}" },
                                { key: "Height", value: "${formData.height}" },
                                { key: "Paper Type", value: "${formData.paperType}" },
                                { key: "Paper Weight", value: "${formData.paperWeight}" },
                                { key: "Front Printing", value: "${formData.frontPrinting}" },
                                { key: "Back Printing", value: "${formData.backPrinting}" },
                                { key: "Expected production cost (not including tax or shipping):", value: "$${totalCost}" }
                            ]
                        }
                    ]
                }
            ) {
                cart {
                    id
                    lines(first: 10) {
                        edges {
                            node {
                                id
                                quantity
                                merchandise {
                                    ... on ProductVariant {
                                        id
                                        price {
                                            amount
                                        }
                                    }
                                }
                                attributes {
                                    key
                                    value
                                }
                            }
                        }
                    }
                    checkoutUrl
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;
}

export function buildGetDepositVariantsQuery(): string {
    return `
        query {
            product1: product(id: "gid://shopify/Product/8411167096968") {
                variants(first: 100) {
                    edges {
                        node {
                            id
                            price {
                                amount
                            }
                        }
                    }
                }
            }
            product2: product(id: "gid://shopify/Product/8409455788168") {
                variants(first: 100) {
                    edges {
                        node {
                            id
                            price {
                                amount
                            }
                        }
                    }
                }
            }
            product3: product(id: "gid://shopify/Product/8409454346376") {
                variants(first: 100) {
                    edges {
                        node {
                            id
                            price {
                                amount
                            }
                        }
                    }
                }
            }
            product4: product(id: "gid://shopify/Product/8351750979720") {
                variants(first: 100) {
                    edges {
                        node {
                            id
                            price {
                                amount
                            }
                        }
                    }
                }
            }
        }
    `;
}