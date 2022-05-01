import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productFetchParamters } from 'src/app/Models/IProdcut';
import { ProductServicesService } from 'src/app/Services/product-services.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private productService: ProductServicesService
  ) { }

  productFetchParamters?: productFetchParamters
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['category']) {
        this.productFetchParamters = {
          categorey: params['category']
        }
      }
      else if (params['searchTerm']) {
        this.productFetchParamters = {
          searchTerm: params['searchTerm']
        }
      }
      else {
        this.productFetchParamters = {}
      }
      console.log(this.productFetchParamters);
    })
  }
}
