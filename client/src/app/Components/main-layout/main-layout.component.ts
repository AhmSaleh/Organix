import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  providers:[CartService]
})
export class MainLayoutComponent implements OnInit {

  constructor(cartService:CartService) { }

  ngOnInit(): void {
  }

}
