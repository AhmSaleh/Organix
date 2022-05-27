import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterEvent, RouterLink } from '@angular/router';
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
  constructor(private cartService: CartService,private productServices: ProductServices,private router: Router) 
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

  addProductIntoCart(event: Event) {
    event.stopPropagation()
    this.cartService.add(this.product);
    Notify.success('Product added to cart Successfully!', { timeout: 1400 });
  }
  
  gotoProductDetails(event: Event) {
    event.stopPropagation()
    // navigate to page
    this.router.navigate(['/product', this.product._id]);
  }
}
