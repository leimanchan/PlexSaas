export function buildGetOrderQuery(orderId: string): string {
  return `{
      order(id: "${orderId}") {
          id
          name
          createdAt
          lineItems(first: 10) {
              edges {
                  node {
                      title
                      quantity
                      originalUnitPrice
                      customAttributes {
                          key
                          value
                      }
                  }
              }
          }
          customer {
              id
              displayName
              email
          }
          metafields(first: 10, namespace: "custom_book") {
              edges {
                  node {
                      id
                      namespace
                      key
                      value
                  }
              }
          }
      }
  }`;
}

export const DRAFT_ORDER_CREATE_MUTATION = `
  mutation {
    draftOrderCreate(
      input: {
        lineItems: [
          {
            title: "Custom Book",
            quantity: 1,
            originalUnitPrice: "952.46",
            requiresShipping: true,
            weight: {
              unit: POUNDS,
              value: 20
            },
            customAttributes: [
              { key: "Page Count", value: "48" },
              { key: "Paper Type", value: "Satin" },
              { key: "Binding", value: "Adhesive Casebound" },
              { key: "Color Printing", value: "Color" },
              { key: "Orientation", value: "Portrait" },
              { key: "Size", value: "Digest" }
            ]
          }
        ],
        customerId: "gid://shopify/Customer/7145304817800",
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
    ) {
      draftOrder {
        id
        lineItems(first: 10) {
          edges {
            node {
              title
              quantity
              originalUnitPrice
              customAttributes {
                key
                value
              }
            }
          }
        }
        customer {
          id
          email
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;