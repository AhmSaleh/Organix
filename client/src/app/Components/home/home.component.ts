import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  constructor(private cartService: CartService,config:  NgbCarouselConfig) {
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
}

  ngOnInit(): void {}
  
    // this.cartService.getCart().subscribe(res=>{
    //   console.log('removed');
    //   console.log(res);

    // },err=>{
    //   console.log('error');
    // });
}
