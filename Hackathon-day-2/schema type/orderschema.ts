//Schema for Order
  
export const order = {
    "id": "UUID",
    "userId": "UUID",
    "products": [
      {
        "productId": "UUID",
        "quantity": "Number",
        "price": "Number" // Price at the time of order
      }
    ],
    "totalAmount": "Number",
    "status": "String", // 'Pending', 'Shipped', 'Delivered', 'Cancelled'
    "shippingAddress": {
      "street": "String",
      "city": "String",
      "state": "String",
      "postalCode": "String",
      "country": "String"
    },
    "paymentMethod": "String", // 'Card', 'PayPal', etc.
    "createdAt": "Date",
    "updatedAt": "Date"
  }
  