import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  JsonpClientBackend,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { url } from 'inspector';
import { catchError, Observable, throwError } from 'rxjs';
import { IProduct } from '../../Models/IProdcut';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {
  ProductUrl = 'http://localhost:3000/api/product';
  constructor(private http: HttpClient) { }

  getProduct(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.ProductUrl}/${id}`);
  }


  deleteProduct(id: string, header: string) {
    return this.http.delete(`${this.ProductUrl}/${id}`, {
      headers: {
        'x-auth-token': header,
      },
    });
  }

  getProductImage(id: string) {
    const options = {
      responseType: 'blob' as const,
    };
    return this.http
      .get(this.ProductUrl + '/image/' + id, {
        responseType: 'blob',
      })
      .pipe(catchError(this.handleError));
  }

  getProductByMerchent(merchentID: string) {
    return this.http.get<IProduct[]>(`${this.ProductUrl}/merchent`, {
      headers: { merchentID: merchentID },
    });
  }


  getProductByCategory(name: string, page: number = 1) {
    return this.http.get<{ name: string, products: IProduct[] }>(
      `${this.ProductUrl}/category/${name}`, { params: { page: page } });
  }

  updateProduct(productID: string, product: FormData, header: any) {
    return this.http.patch<any>(this.ProductUrl + '/' + productID, product, {
      headers: {
        'x-auth-token': header,
      },
    });
  }

  addProduct(product: IProduct) {
    return this.http.post<IProduct>(this.ProductUrl, product);
  }

  addProductAny(product: any, header: any) {
    return this.http.post<any>(this.ProductUrl, product, {
      headers: {
        'x-auth-token': header,
      },
    });
  }

  getAllProducts(page: number = 1): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.ProductUrl, { params: { page: page } });
  }


  getProductBySearchTerm(searchTerm: string, page: number = 1): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.ProductUrl}/search/${searchTerm}`, { params: { page: page } });
  }

  getProductByCategoryCount(name: string): Observable<{ productsCount: number }> {
    return this.http.get<{ productsCount: number }>(`${this.ProductUrl}/CatgCount`, { params: { category: name } });
  }

  getAllProductsCount(): Observable<{ productsCount: number }> {
    return this.http.get<{ productsCount: number }>(`${this.ProductUrl}/allCount`);
  }
  getProductBySearchTermCount(searchTerm: string): Observable<{ productsCount: number }> {
    return this.http.get<{ productsCount: number }>(`${this.ProductUrl}/searchCount`, { params: { searchTerm: searchTerm } });
  }



  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(() => error);
  }
}
