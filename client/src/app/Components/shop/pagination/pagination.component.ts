import { Component, Input, OnInit } from '@angular/core';
import { productFetchParamters } from 'src/app/Models/IProdcut';
import { ProductServices } from 'src/app/Services/ProductServices/product-services.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number = 1;
  lastPageNumber: number = 10;
  @Input() linkParamters?: productFetchParamters;
  constructor(private productServices: ProductServices) { }

  pageWithParamters: any = (pageNumber: number) => {
    return { ...this.linkParamters, page: pageNumber };
  };

  pagesList: number[] = [];
  ngOnInit(): void {
    this.pagesList = Array.from(Array(this.currentPage).keys()).map(i => i + 1);
    if (this.linkParamters?.category) {
      this.productServices.getProductByCategoryCount(this.linkParamters.category).subscribe(data => {
        this.updatePagesCount(data.productsCount)
      });
    }
    else if (this.linkParamters?.searchTerm) {
      this.productServices.getProductBySearchTermCount(this.linkParamters.searchTerm).subscribe(data => {
        this.updatePagesCount(data.productsCount)
      }
      );
    }
    else {
      this.productServices.getAllProductsCount().subscribe(data => {
        this.updatePagesCount(data.productsCount)
      });
    }
    
  }

  updatePagesCount(pagesNumber: number) {
    this.lastPageNumber = pagesNumber;
    this.pagesList = Array.from(Array(this.lastPageNumber).keys()).map(i => i + 1);
  }

}
