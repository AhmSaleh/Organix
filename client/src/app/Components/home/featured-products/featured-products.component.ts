import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { ProductServices } from 'src/app/Services/ProductServices/product-services.service';
import { IProduct } from 'src/app/Models/IProdcut';
import { Router, RouterEvent, RouterLink } from '@angular/router';
import { Notify } from 'notiflix';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css'],
})
export class FeaturedProductsComponent implements OnInit {
  featuredProducts: IProduct[] = [];
  currentImage: Record<string, string> = {};
  product: IProduct;

  constructor(private cartService: CartService, private productService: ProductServices, private router: Router) {
    this.product = {} as IProduct;
  }

  ngOnInit(): void {
    this.productService.getLatest8Products().subscribe(data => {
      this.featuredProducts = data;
    }, err => console.log(err)
    )
    this.currentImage = {
      'background-image': `url(${this.productService.getProductImageUrl(this.product._id)})`,
    };
  }

  gotoProductDetails(event: Event, id: string) {
    event.stopPropagation()
    // navigate to page
    this.router.navigate(['/product', id]);
  }


  addToCart(id: string) {
    this.productService.getProduct(id).subscribe(data => {
      this.cartService.add(data);
      Notify.success('Product added to cart Successfully!', { timeout: 1000, closeButton: true, });
    },err => console.log(err));
  }

  // removeFromCart(id: string) {
  //   this.productService.getProduct(id).subscribe(data => {
  //     this.cartService.remove(data);
  //   },err => console.log(err));
  // }
}
