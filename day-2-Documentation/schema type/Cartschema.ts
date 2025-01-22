//Schema for cart.

export const  cart = {
    "id": "UUID",
    "userId": "UUID",
    "products": [
      {
        "productId": "UUID",
        "quantity": "Number"
      }
    ],
    "createdAt": "Date",
    "updatedAt": "Date"
  }
  
  
  