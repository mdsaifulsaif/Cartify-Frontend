export interface IProduct {
  _id: string;
  name: string;
  thumbnail: string;
  salePrice: number;
  regularPrice?: number;
  isNew?: boolean;
  categoryID?: {
    name: string;
  };
  rating?: number;
  reviews?: number;
}

export interface ProductProps {
  product: {
    _id: string;
    name: string;
    thumbnail: string;
    salePrice: number;
    categoryID?: {
      name: string;
    };
    rating?: number;
    reviews?: number;
  };
}
 export interface ICategory {
  _id: string;
  name: string;
  image: string;
}

export interface ITestimonial {
  id: number;
  name: string;
  image: string;
  text: string;
  rating: number;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  salePrice: number;
  regularPrice?: number;
  thumbnail: string;
  images: string[];
  categoryID?: {
    name: string;
  };
  straight_up?: string;
  lowdown?: string[];
  stock: number;
}