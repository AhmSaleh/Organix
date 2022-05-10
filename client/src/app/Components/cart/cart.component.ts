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
    this.refreshData();
  }

  inc(itemIndex: number) {
    if (
      this.Products[itemIndex].Count + 1 <=
      this.Products[itemIndex].product.availableInventory
    ) {
      this.cart.add(this.Products[itemIndex].product);
      this.refreshData();
    }
  }

  dec(itemIndex: number) {
    if (this.Products[itemIndex].Count > 1) {
      this.cart.remove(this.Products[itemIndex].product);
      this.refreshData();
    }
  }

  removeItem(itemIndex: number) {
    this.cart.removeAll(this.Products[itemIndex].product);
    this.refreshData();
  }

  calcCartTotal(): number {
    let cartTotal = 0;
    for (let product of this.Products) {
      cartTotal += product.Count * product.product.price;
    }
    return cartTotal;
  }

  refreshData() {
    this.cart.getCart((data: any) => {
      this.Products = data.Products;
    });
  }
}
