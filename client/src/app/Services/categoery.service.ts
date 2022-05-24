import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ICategory from '../Models/ICategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  CategoryUrl = 'http://localhost:3000/api/category';
  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.CategoryUrl + '/all');
  }

  getCategoryNameById(id: string) {
    return this.http.get<ICategory>(this.CategoryUrl + '/' + id);
  }

  getCategoryImage(id: string) {
    const options = {
      responseType: 'blob' as const,
    };
    return this.http.get(this.CategoryUrl + '/image/' + id, {
      responseType: 'blob',
    });
  }

  addCategory(category: any, header: any) {
    return this.http.post<any>(this.CategoryUrl, category, {
      headers: {
        'x-auth-token': header,
      },
    });
  }

  updateCategory(categoryID: string, category: FormData, header: any) {
    return this.http.patch<any>(this.CategoryUrl + '/' + categoryID, category, {
      headers: {
        'x-auth-token': header,
      },
    });
  }

  deleteCategory(categoryID: string, header: string) {
    return this.http.delete(this.CategoryUrl + '/' + categoryID, {
      headers: {
        'x-auth-token': header,
      },
    });
  }
}
