import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Services/ProductServices/get-all.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  constructor() { 
    this.product = {} as IProduct;
  }

  ngOnInit(): void {
    this.currentImage = {
      'background-image': `url(${this.product.imgURL})`
    };
  }

  currentImage: Record<string, string> = {};


  @Input() product: IProduct;
}
