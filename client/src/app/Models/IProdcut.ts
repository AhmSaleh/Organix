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
  status: Status;
}

export enum Status {
  approved = 'approved',
  pending = 'pending',
  rejected = 'rejected',
}

export interface productFetchParamters {
  category?: string;
  searchTerm?: string;
  page?: number;
}
