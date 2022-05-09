import { Injectable } from '@angular/core';

import { IProduct } from '../Interfaces/IProduct';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable, of } from 'rxjs';

import { AuthService } from './auth.service';

import { ICartView } from '../Interfaces/ICartView';

import * as _ from 'lodash';
import { ICart } from '../Interfaces/ICart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: ICartView;

  constructor(private http: HttpClient, private auth: AuthService) {
    if (this.auth.isLoggedIn()) {
      this.cart = {};
      this.http
        .get<ICartView>(
          'http://localhost:3000/api/cart/' + this.auth.getUserId()
        )
        .subscribe((res) => {
          this.cart = res;
        });
    } else {
      let empty = JSON.stringify({ Products: [] });
      let newCart: ICartView = JSON.parse(
        localStorage.getItem('Cart') || empty
      );
      if (newCart.Products?.length == 0) {
        localStorage.setItem('Cart', empty);
      }
      this.cart = newCart;
    }
  }

  getCart(): any {
    if (this.auth.isLoggedIn()) {
      const temp = this.http.get<ICartView>(
        'http://localhost:3000/api/cart/' + this.auth.getUserId()
      );
      return temp;
    } else {
      let empty = JSON.stringify({ Products: [] });
      let newCart: ICartView = JSON.parse(
        localStorage.getItem('Cart') || empty
      );
      if (newCart.Products?.length == 0) {
        localStorage.setItem('Cart', empty);
      }
      //this.products = of(newCart);
      this.cart = newCart;
      return newCart;
    }
  }

  //TODO: check availability

  add(product: IProduct) {
    let obj = this.cart.Products?.find((i) =>
      _.isEqualWith(i.product, product)
    );
    if (obj) {
      obj.Count++;
    } else {
      this.cart.Products?.push({ product: product, Count: 1 });
    }
    //console.log(this.cart);

    this.syncItems();
  }
  remove(product: IProduct) {
    let index = this.cart.Products?.findIndex((i) =>
      _.isEqualWith(i.product, product)
    );
    if (index == -1) return;
    if (this.cart.Products![index!].Count > 1) {
      this.cart.Products![index!].Count--;
    } else {
      this.cart.Products?.splice(index!, 1);
    }
    this.syncItems();
  }

  removeAll(product: IProduct) {
    let index = this.cart.Products?.findIndex((i) =>
      _.isEqualWith(i.product, product)
    );
    this.cart.Products?.splice(index!, 1);
    this.syncItems();
  }

  // syncItems() {
  //   if (this.auth.isLoggedIn()) {
  //     TODO: replace array in database with product list
  //     let cart: ICart ={UserID:this.auth.getUserId(),Products:[]}
  //     this.products.subscribe(res=>{
  //       res.Products?.map((p)=>{
  //         cart.Products.push({ProductID:p.product._id,Count:p.Count});
  //       })
  //     })
  //     //save cart in database

  //     this.http.post<ICart>('http://localhost:3000/api/cart/',cart);
  //   } else {
  //      let cart :ICartView = {};
  //      this.products.subscribe(res=>{cart = res})
  //     localStorage.setItem('Cart', JSON.stringify(cart)); // sync the data
  //   }
  // }

  syncItems() {
    if (this.auth.isLoggedIn()) {
      let mapped = this.cart.Products?.map((p) => {
        return { ProductID: p.product._id, Count: p.Count };
      });
      this.http
        .post<ICart>('http://localhost:3000/api/cart', {
          UserID: this.auth.getUserId(),
          Products: mapped,
        })
        .subscribe(
          (data) => {
            console.log(data);
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      localStorage.setItem('Cart', JSON.stringify(this.cart)); // sync the data
    }
  }
}
