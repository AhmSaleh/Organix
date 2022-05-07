import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ICategory from '../Models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  CategoryUrl = 'http://localhost:3000/api/category';
  constructor(private http:HttpClient) { }

  getCategories(): Observable<ICategory[]>{
    return this.http.get<ICategory[]>(this.CategoryUrl+"/all");
  }

}
