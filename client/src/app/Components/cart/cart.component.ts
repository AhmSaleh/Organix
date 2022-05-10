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
  cartTotal: number = 0;

  ngOnInit(): void {
    if (this.auth.isLoggedIn())
      this.cart.getCart().subscribe(
        (res: any) => {
          this.Products = res.Products;
          this.calcCartTotal();
        },
        (err: any) => console.log(err)
      );
    else {
      this.Products = this.cart.getCart();
    }
  }
  inc(itemIndex: number) {
    console.log(this.Products[itemIndex].product.availableInventory);
    if (
      this.Products[itemIndex].Count + 1 <=
      this.Products[itemIndex].product.availableInventory
    )
      this.Products[itemIndex].Count++;
  }
  dec(itemIndex: number) {
    if (this.Products[itemIndex].Count > 1) this.Products[itemIndex].Count--;
  }
  removeItem(itemIndex: number) {
    this.Products.splice(itemIndex, 1);
  }
  calcCartTotal(): void {
    for (let product of this.Products) {
      this.cartTotal += product.Count * product.product.price;
    }
  }
}
