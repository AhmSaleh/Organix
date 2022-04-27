import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IProduct {
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

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  UserUrl = 'http://localhost:3000/api/product';
  constructor(private http:HttpClient) { }

  getAllProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.UserUrl);
  }
}
