import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from 'src/app/Interfaces/IProduct';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
  showNavigationArrows = false;
  showNavigationIndicators = false;
  images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(private cartService: CartService,config:  NgbCarouselConfig) {
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
}

  ngOnInit(): void {}
  addToCart() {
    this.cartService.add({
      _id: '626c8e6db4573ed088c213d9',
      name: 'Yvor',
      rate: 5,
      price: 573.71,
      shortDescription:
        'Introduction of Oth Hormone into Periph Vein, Open Approach',
      availability: false,
      imgURL: 'http://dummyimage.com/557x438.png/cc0000/ffffff',
      weight: 1269,
      availableInventory: 78,
      longDescription:
        'Introduction of Other Hormone into Peripheral Vein, Open Approach',
      productInformation: 'Alpha thalassemia',
    });
  }
  removeFromCart() {
    this.cartService.remove({
      _id: '626c8e6db4573ed088c213d9',
      name: 'Yvor',
      rate: 5,
      price: 573.71,
      shortDescription:
        'Introduction of Oth Hormone into Periph Vein, Open Approach',
      availability: false,
      imgURL: 'http://dummyimage.com/557x438.png/cc0000/ffffff',
      weight: 1269,
      availableInventory: 78,
      longDescription:
        'Introduction of Other Hormone into Peripheral Vein, Open Approach',
      productInformation: 'Alpha thalassemia',
    });
    // this.cartService.getCart().subscribe(res=>{
    //   console.log('removed');
    //   console.log(res);

    // },err=>{
    //   console.log('error');
    // });
  }
}
