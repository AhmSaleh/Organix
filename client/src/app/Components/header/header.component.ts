import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartView } from 'src/app/Interfaces/ICartView';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  val:number = 0;
  cart:Observable<ICartView>;
  constructor(private cartService:CartService) { 
    this.cart =this.cartService.getCart();
  }

  
}
