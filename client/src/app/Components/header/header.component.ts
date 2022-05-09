import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartView } from 'src/app/Interfaces/ICartView';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  val: number = 0;
  cart: ICartView | undefined;
  constructor(private cartService: CartService, private auth: AuthService) {
    if (this.auth.isLoggedIn())
      this.cartService.getCart().subscribe(
        (res: any) => {
          this.cart = res;
        },
        (err: any) => console.log(err)
      );
    else {
      this.cart = this.cartService.getCart();
    }
    // this.cartService.getCart().subscribe(
    //   (res: any) => {
    //     this.cart = res;
    //   },
    //   (err: any) => {
    //     console.log(err);
    //   }
    // );
  }
}
