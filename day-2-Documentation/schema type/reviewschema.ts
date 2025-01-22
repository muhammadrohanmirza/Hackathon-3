//Schema for Reviews.

export const  Reviews = {
    "id": "UUID",
    "productId": "UUID",
    "userId": "UUID",
    "rating": "Number", // 1 to 5
    "comment": "String",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
  
  