export interface IProduct {
    _id: string;
    name: string;
    rate: number;
    price: number;
    shortDescription: string;
    availability: boolean;
    imgURL: string;
    weight: number;
    availableInventory: number;
    longDescription: string;
    productInformation: string;
  }

export interface productFetchParamters {
    categorey?: string;
    searchTerm?: string;
  }