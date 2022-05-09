import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.cart.getCart().subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
