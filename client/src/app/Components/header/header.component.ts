import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartView } from 'src/app/Interfaces/ICartView';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  val: number = 0;
  cart: ICartView | undefined;
  constructor(private cartService: CartService) {
    this.cartService.getCart().subscribe(
      (res) => {
        this.cart = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
