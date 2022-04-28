import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/Models/IProdcut';


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
