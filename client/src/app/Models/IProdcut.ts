export interface IProduct {
    _id: string;
    name: string;
    rate: number;
    price: number;
    shortDescription: string;
    availability: boolean;
    imgURL: string;
    imagesURL: string[];
    weight: number;
    availableInventory: number;
    longDescription: string;
    productInformation: string;
    merchantId: string;
    categoryName: string;
  }

export interface productFetchParamters {
    category?: string;
    searchTerm?: string;
    page?: number;
  }