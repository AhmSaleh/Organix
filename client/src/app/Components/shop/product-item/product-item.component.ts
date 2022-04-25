import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../product-grid/product-grid.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  constructor() { 
    this.product = {
      id: 0,
      name: 'Product default',
      price: 100,
      imageUrl: 'https://picsum.photos/200/300'
    };
  }

  ngOnInit(): void {
    this.currentImage = {
      'background-image': `url(${this.product.imageUrl})`
    };
  }

  currentImage: Record<string, string> = {};


  @Input() product: IProduct;
}
