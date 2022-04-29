import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/IProdcut';


@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {
  UserUrl = 'http://localhost:3000/api/product';
  constructor(private http:HttpClient) { }

  getProduct(id: string): Observable<IProduct>{
    console.log(id);
    return this.http.get<IProduct>(`${this.UserUrl}/${id}`);
  }
}
