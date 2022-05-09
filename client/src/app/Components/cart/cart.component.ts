import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private cart: CartService, private auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn())
      this.cart.getCart().subscribe(
        (res: any) => console.log(res),
        (err: any) => console.log(err)
      );
    else {
      console.log(this.cart.getCart());
    }
  }
}
