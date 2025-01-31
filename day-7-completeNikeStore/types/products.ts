


export interface Product {

    _id: string;    
    productName: string;
    _type: string;
    image : {
        asset: {
            _ref: string;
            _type: "image";
        }
    };
    catagory: string;
    inventory: number;
    colors: string[];
    status: string;
    price: number;
    description: string;
    slug: {
        _type: "slug";
        current: string;
    };
    quantity: number; // Add this line
    // tags: string[];
    // rating: number;
    // reviews: number;
}


