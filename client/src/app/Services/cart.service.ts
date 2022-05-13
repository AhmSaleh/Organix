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
// export class CartService {
//   private cart: ICartView;

//   constructor(private http: HttpClient, private auth: AuthService) {
//     if (this.auth.isLoggedIn()) {
//       this.cart = {Products:[]};
//       this.http
//         .get<ICartView>(
//           'http://localhost:3000/api/cart/' + this.auth.getUserId()
//         )
//         .subscribe((res) => {
//           this.cart = res;
//         });
//     } else {
//       let empty = JSON.stringify({ Products: [] });
//       let newCart: ICartView = JSON.parse(
//         localStorage.getItem('Cart') || empty
//       );
//       if (newCart.Products?.length == 0) {
//         localStorage.setItem('Cart', empty);
//       }
//       this.cart = newCart;
//     }
//   }

//   getCart() {
//    return this.cart;
//   }
  

//   //TODO: check availability
//   //TODO: remove lowdash
//   //TODO: add cart to register

//   add(product: IProduct) {


//     let index = this.cart.Products?.findIndex((i) =>
//     i.product._id == product._id
//   );

//   if (index == -1){
//     this.cart.Products?.push({ product: product, Count: 1 });
//   }
//   else{
//     this.cart.Products![index!].Count++;
//   }
//   this.syncItems();
//   }
//   remove(product: IProduct) {
//     let index = this.cart.Products?.findIndex((i) =>
//     i.product._id == product._id
//     );
//     if (index == -1) return;
//     if (this.cart.Products![index!].Count > 1) {
//       this.cart.Products![index!].Count--;
//     } else {
//       this.cart.Products?.splice(index!, 1);
//     }
//     this.syncItems();
//   }

//   removeAll(product: IProduct) {
//     let index = this.cart.Products?.findIndex((i) =>
//     i.product._id == product._id
//     );
//     this.cart.Products?.splice(index!, 1);
//     this.syncItems();
//   }


//   syncItems() {
//     if (this.auth.isLoggedIn()) {
//       let mapped = this.cart.Products?.map((p) => {
//         return { ProductID: p.product._id, Count: p.Count };
//       });
//       this.http
//         .post<ICart>('http://localhost:3000/api/cart', {
//           UserID: this.auth.getUserId(),
//           Products: mapped,
//         })
//         .subscribe(
//           (data) => {
//             this.http
//             .get<ICartView>(
//             'http://localhost:3000/api/cart/' + this.auth.getUserId()
//             )
//             .subscribe((res) => {
//             this.cart = res;
//             });
//           },
//           (err) => {
//             console.log(err);
//           }
//         );
//     } else {
//       localStorage.setItem('Cart', JSON.stringify(this.cart)); // sync the data
//     }
//   }
// }




















//for testing

export class CartService {
// private cart: ICartView;
  CartEmitter = new Subject<ICartView>();
  constructor(private http: HttpClient, private auth: AuthService) {


    // let empty = JSON.stringify({ Products: [] });
    // let newCart: ICartView = JSON.parse(
    //   localStorage.getItem('Cart') || empty
    // );
    // if (newCart.Products?.length == 0) {
    //   localStorage.setItem('Cart', empty);
    // }
    //this.cart = newCart;

    if (this.auth.isLoggedIn()) {
     // this.cart = {Products:[]};
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
    console.log('getcart function from service');
  let empty = JSON.stringify({ Products: [] });
   let newCart: ICartView = JSON.parse(
     localStorage.getItem('Cart') || empty
   );

   return newCart
  }
  

  //TODO: check availability
  //TODO: remove lowdash
  //TODO: add cart to register

  add(product: IProduct) {

    let cart = this.getCart();
    let index = cart.Products?.findIndex((i) =>
    i.product._id == product._id
  );

 
  if (index == -1){
    cart.Products?.push({ product: product, Count: 1 });
  }
  else{

    if(product.availableInventory > cart.Products[index].Count){
      cart.Products![index!].Count++;
    }
  }
  this.syncItems(cart);
  }
  remove(product: IProduct) {
    let cart = this.getCart();
    let index = cart.Products?.findIndex((i) =>
    i.product._id == product._id
    );
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
    let index = cart.Products?.findIndex((i) =>
    i.product._id == product._id
    );
    cart.Products?.splice(index!, 1);
    this.syncItems(cart);
  }


  syncItems(cart:ICartView) {

    localStorage.setItem('Cart', JSON.stringify(cart)); // sync the data
    this.CartEmitter.next(cart);

    if (this.auth.isLoggedIn()) {
      let mapped = cart.Products?.map((p) => {
        return { ProductID: p.product._id, Count: p.Count };
      });
      this.http.post<ICart>('http://localhost:3000/api/cart', {
          UserID: this.auth.getUserId(),
          Products: mapped,
        }).subscribe(res=>{
        })
    } 
    
  }

}