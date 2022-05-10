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

  getProductByCategory(name: string,page: number = 1){
    return this.http.get<{name:string,products:IProduct[]}>(`${this.ProductUrl}/category/${name}`,{params:{page:page}});
  }

  getAllProducts(page: number = 1): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.ProductUrl,{params:{page:page}});
  }
  getProductBySearchTerm(searchTerm: string,page: number = 1): Observable<IProduct[]>{
    return this.http.get<IProduct[]>(`${this.ProductUrl}/search/${searchTerm}`,{params:{page:page}});
  }
  getProductByCategoryCount(name: string): Observable<{productsCount:number}>{
    return this.http.get<{productsCount:number}>(`${this.ProductUrl}/CatgCount`,{params:{category:name}});
  }
  getAllProductsCount(): Observable<{productsCount:number}>{
    return this.http.get<{productsCount:number}>(`${this.ProductUrl}/allCount`);
  }
  getProductBySearchTermCount(searchTerm: string): Observable<{productsCount:number}>{
    return this.http.get<{productsCount:number}>(`${this.ProductUrl}/searchCount`,{params:{searchTerm:searchTerm}});
  }
}
