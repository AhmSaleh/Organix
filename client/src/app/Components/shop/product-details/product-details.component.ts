import { Component, Input, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IProduct } from 'src/app/Models/IProdcut';
import { ProductServicesService } from 'src/app/Services/product-services.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product: IProduct = {} as IProduct;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductServicesService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productService.getProduct(params['id'])
      .subscribe((product) => {  this.product = product; });
    })
  }

}
