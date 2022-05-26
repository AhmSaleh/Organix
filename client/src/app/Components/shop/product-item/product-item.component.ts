import { Component, Input, OnInit } from '@angular/core';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { IProduct } from 'src/app/Models/IProdcut';
import { CartService } from 'src/app/Services/cart.service';
import { ProductServices } from 'src/app/Services/ProductServices/product-services.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  constructor(private cartService: CartService,private productServices: ProductServices) 
  {
    this.product = {} as IProduct;
  }

  ngOnInit(): void {
    this.currentImage = {
      'background-image': `url(${this.productServices.getProductImageUrl(this.product._id)})`,
    };
  }
  


  currentImage: Record<string, string> = {};

  @Input() product: IProduct;

  addProductIntoCart() {
    this.cartService.add(this.product);
    Notify.success('Product added to cart Successfully!', { timeout: 1400 });
  }
}
