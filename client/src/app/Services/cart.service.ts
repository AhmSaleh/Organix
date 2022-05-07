import { Injectable } from '@angular/core';

import { IProduct } from '../Interfaces/IProduct';
import { HttpClient } from '@angular/common/http';

import { Observable,of } from 'rxjs';

import { AuthService } from './auth.service';

import { ICartView } from '../Interfaces/ICartView';

import * as _ from "lodash";
import { ICart } from '../Interfaces/ICart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private products: Observable<ICartView> ;

  constructor(private http: HttpClient, private auth: AuthService) {

    if (this.auth.isLoggedIn()) {
      //get cart from database
       this.products = this.http.get<ICartView>('http://localhost:3000/api/cart/' + this.auth.getUserId());
      
    }else {
      let empty = JSON.stringify({Products:[]});
      let newCart:ICartView = JSON.parse(localStorage.getItem('Cart')||empty);
       if(newCart.Products?.length == 0){
         localStorage.setItem('Cart',empty)
       }
      this.products = of(newCart);
    
  }

  }
  getCart():Observable<ICartView>{
    return this.products;
  }

  add(product: IProduct) {
    this.products.subscribe(c=>{

      let obj  = c.Products?.find(i => _.isEqualWith(i.product,product))
      if(obj){
        obj.Count++;
      }else{
        c.Products?.push({product:product,Count:1})
      }

      
    })
    this.syncItems();
  }
  remove(product: IProduct) {
    this.products.subscribe(c=>{

      let index  = c.Products?.findIndex(i => _.isEqualWith(i.product,product))
      if(index == -1)return;
      if(c.Products![index!].Count > 1)
      {
        c.Products![index!].Count--;
      }else{
        c.Products?.splice(index!,1);
      }

      
    })
    this.syncItems();
  }

  syncItems() {
    if (this.auth.isLoggedIn()) {
      // TODO: replace array in database with product list
      let cart: ICart ={UserID:this.auth.getUserId(),Products:[]}
      this.products.subscribe(res=>{
        res.Products?.map((p)=>{
          cart.Products.push({ProductID:p.product._id,Count:p.Count})
        })
      })
      //save cart in database
      this.http.post<ICart>('http://localhost:3000/api/cart/',cart);
    } else {
       let cart :ICartView = {};
       this.products.subscribe(res=>{cart = res})
      localStorage.setItem('Cart', JSON.stringify(cart)); // sync the data
    }
  }
}
