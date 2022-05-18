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

  currentPage: number = 1;

  productFetchParamters?: productFetchParamters
  ngOnInit(): void {
    //TODO fetch the number of pages from the server
    this.route.queryParams.subscribe(params => {
      this.productFetchParamters = params
      if (this.productFetchParamters.page != undefined) {
        this.currentPage = this.productFetchParamters.page;
      }
      else {
        this.currentPage = 1;
      }

    })
  }
}
