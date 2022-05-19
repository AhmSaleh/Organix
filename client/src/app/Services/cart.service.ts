import { Injectable } from '@angular/core';

import { IProduct } from '../Interfaces/IProduct';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';

import { ICartView } from '../Interfaces/ICartView';

import * as _ from 'lodash';
import { ICart } from '../Interfaces/ICart';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  CartEmitter = new Subject<ICartView>();
  constructor(private http: HttpClient, private auth: AuthService) {

    if (this.auth.isLoggedIn()) {
      this.http
        .get<ICartView>(
          'http://localhost:3000/api/cart/' + this.auth.getUserId()
        )
        .subscribe((res) => {
          //this.cart = res;
          localStorage.setItem('Cart', JSON.stringify(res));
        });
    }
  }

  getCart() {
    let empty = JSON.stringify({ Products: [] });
    let newCart: ICartView = JSON.parse(localStorage.getItem('Cart') || empty);

    return newCart;
  }

  //TODO: check availability
  //TODO: remove lowdash

  add(product: IProduct) {
    let cart = this.getCart();
    let index = cart.Products?.findIndex((i) => i.product._id == product._id);

    if (index == -1) {
      cart.Products?.push({ product: product, Count: 1 });
    } else {
      if (product.availableInventory > cart.Products[index].Count) {
        cart.Products![index!].Count++;
      }
    }
    this.syncItems(cart);
  }
  remove(product: IProduct) {
    let cart = this.getCart();
    let index = cart.Products?.findIndex((i) => i.product._id == product._id);
    if (index == -1) return;
    if (cart.Products![index!].Count > 1) {
      cart.Products![index!].Count--;
    } else {
      cart.Products?.splice(index!, 1);
    }
    this.syncItems(cart);
  }

  removeAll(product: IProduct) {
    let cart = this.getCart();
    let index = cart.Products?.findIndex((i) => i.product._id == product._id);
    cart.Products?.splice(index!, 1);
    this.syncItems(cart);
  }

  clearCart(){
    let cart: ICartView = { Products: [] }
    this.syncItems(cart);
  }

  calcCartTotal(): number {
    let cartTotal = 0;
    for (let product of this.getCart().Products) {
      cartTotal += product.Count * product.product.price;
    }
    return cartTotal;
  }

  syncItems(cart: ICartView) {
    localStorage.setItem('Cart', JSON.stringify(cart)); // sync the data
    this.CartEmitter.next(cart);

    if (this.auth.isLoggedIn()) {
      let mapped = cart.Products?.map((p) => {
        return { ProductID: p.product._id, Count: p.Count };
      });
      this.http
        .post<ICart>('http://localhost:3000/api/cart', {
          UserID: this.auth.getUserId(),
          Products: mapped,
        })
        .subscribe((res) => {});
    }
  }
}
