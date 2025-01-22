//Schema for Products.

export const product = {
  "id": "UUID",
  "name": "String",
  "description": "String",
  "price": "Number",
  "discount": "Number", // percentage or fixed
  "category": "String",
  "stock": "Number",
  "images": ["String"], // URLs
  "ratings": "Number", // Average rating
  "createdAt": "Date",
  "updatedAt": "Date"
}

  
  //Schema for Payments.

export const  Payments = {
  "id": "UUID",
  "orderId": "UUID",
  "userId": "UUID",
  "amount": "Number",
  "method": "String", // 'Credit Card', 'PayPal', etc.
  "status": "String", // 'Paid', 'Failed'
  "createdAt": "Date"
}

  
  //Schema for Admin Dashboard.

export const  cart = {
  "id": "UUID",
  "totalUsers": "Number",
  "totalOrders": "Number",
  "totalRevenue": "Number",
  "createdAt": "Date",
  "updatedAt": "Date"
}



  