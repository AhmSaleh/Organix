import { Component, OnInit } from '@angular/core';
import { ICartView } from 'src/app/Interfaces/ICartView';
import { IProduct } from 'src/app/Interfaces/IProduct';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
// export class CartComponent implements OnInit {
//   constructor(private cart: CartService, private auth: AuthService) {}

//   Products: { product: IProduct; Count: number }[] = [];

//   ngOnInit(): void {
//     this.Products= this.cart.getCart().Products;
//    this.refreshData();
//   }

//   inc(itemIndex: number) {
//     if (
//       this.Products[itemIndex].Count + 1 <=
//       this.Products[itemIndex].product.availableInventory
//     ) {
//       this.cart.add(this.Products[itemIndex].product);
//       this.refreshData();
//     }
//   }

//   dec(itemIndex: number) {
//     if (this.Products[itemIndex].Count > 1) {
//       this.cart.remove(this.Products[itemIndex].product);
//       this.refreshData();
//     }
//   }

//   removeItem(itemIndex: number) {
//     this.cart.removeAll(this.Products[itemIndex].product);
//     this.refreshData();
//   }

//   calcCartTotal(): number {
//     let cartTotal = 0;
//     for (let product of this.Products) {
//       cartTotal += product.Count * product.product.price;
//     }
//     return cartTotal;
//   }

//   refreshData() {
//     this.Products= this.cart.getCart().Products;
//   }
// }

export class CartComponent implements OnInit {
  constructor(public cart: CartService, private auth: AuthService) {}

  Products: ICartView = {Products:[]};

  ngOnInit(): void {
    this.Products = this.cart.getCart();
    this.cart.CartEmitter.subscribe(res=>{
      this.Products = res
    })
  }

  inc(product:any) {
      this.cart.add(product);
  }

  dec(product:any) {
    //if (this.Products[itemIndex].Count > 1) {
      this.cart.remove(product);
    }
  

  removeItem(product:any) {
    this.cart.removeAll(product);
  }

  calcCartTotal(): number {
    let cartTotal = 0;
    for (let product of this.Products.Products) {
      cartTotal += product.Count * product.product.price;
    }
    return cartTotal;
  }

}
