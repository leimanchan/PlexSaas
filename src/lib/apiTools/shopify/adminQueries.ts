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