import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Interfaces/IProduct';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cart: CartService, private auth: AuthService) {}

  Products: { product: IProduct; Count: number }[] = [];

  ngOnInit(): void {
    console.log('Dkhl hnaaa');
    if (this.auth.isLoggedIn())
      this.cart.getCart().subscribe(
        (res: any) => {
          this.Products = res.Products;
        },
        (err: any) => console.log(err)
      );
    else {
      this.Products = this.cart.getCart().Products;
    }
  }
  inc(itemIndex: number) {
    if (
      this.Products[itemIndex].Count + 1 <=
      this.Products[itemIndex].product.availableInventory
    ) {
      this.cart.add(this.Products[itemIndex].product);
    }
  }
  dec(itemIndex: number) {
    if (this.Products[itemIndex].Count > 1) {
      this.cart.remove(this.Products[itemIndex].product);
    }
  }
  removeItem(itemIndex: number) {
    this.cart.removeAll(this.Products[itemIndex].product);
  }

  calcCartTotal(): number {
    let cartTotal1 = 0;
    for (let product of this.Products) {
      cartTotal1 += product.Count * product.product.price;
    }
    return cartTotal1;
  }
}
