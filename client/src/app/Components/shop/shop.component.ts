import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productFetchParamters } from 'src/app/Models/IProdcut';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) { }

  productFetchParamters?: productFetchParamters
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.productFetchParamters = params
    })
  }
}
