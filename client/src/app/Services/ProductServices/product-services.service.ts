import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../Models/IProdcut';


@Injectable({
  providedIn: 'root'
})
export class ProductServices {
  ProductUrl = 'http://localhost:3000/api/product';
  constructor(private http:HttpClient) { }

  getProduct(id: string): Observable<IProduct>{
    return this.http.get<IProduct>(`${this.ProductUrl}/${id}`);
  }

  getProductByCategory(name: string){
    return this.http.get<{name:string,products:IProduct[]}>(`${this.ProductUrl}/category/${name}`);
  }
  

  getAllProducts(): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.ProductUrl);
  }
  getProductBySearchTerm(searchTerm: string): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`${this.ProductUrl}/search/${searchTerm}`);
  }
}
