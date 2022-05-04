import { Component, Input, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IProduct } from 'src/app/Models/IProdcut';
import { ProductServices } from 'src/app/Services/ProductServices/product-services.service';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product: IProduct = {} as IProduct;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductServices) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productService.getProduct(params['id'])
      .subscribe((product) => {
          this.product = product;
          this.selectedImage = this.product.imgURL; });
    })
  }

  selectedImage: string = "";

  updateSelected(event: MouseEvent) {
    const imgElem = event.target as HTMLImageElement;
    this.selectedImage = imgElem.src;
  }
}
