import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { lastValueFrom, take } from 'rxjs';
import { productFetchParamters } from 'src/app/Models/IProdcut';
import { ProductServices } from 'src/app/Services/ProductServices/product-services.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent  {

  @Input() currentPage: number = 1;
  
  viewStartIndex = (currentPage:number) => (currentPage-4 > 0) ? currentPage-4 : 0;
  viewEndIndex = (currentPage:number) => (this.viewStartIndex(currentPage)+4 < this.lastPageNumber) ? this.viewStartIndex(currentPage)+4 : this.lastPageNumber;
  
  lastPageNumber: number = 10;
  @Input() linkParamters?: productFetchParamters;
  constructor(private productServices: ProductServices) { }

  pageWithParamters: any = (pageNumber: number) => {
    return { ...this.linkParamters, page: pageNumber };
  };


  async ngOnChanges(changes: SimpleChanges) {
    //TODO don't fetch if only the page number changed
    if (changes["linkParamters"] && this.linkParamters != undefined) {
      const count = await this.getPageCount();
      this.updatePagesCount(count)    
    }
  }

  pagesList: number[] = [];


  async getPageCount(): Promise<number> {
    if (this.linkParamters?.category) {
      let data = await lastValueFrom(this.productServices
        .getProductByCategoryCount(this.linkParamters.category)
      )
      return data.productsCount;
    }
    else if (this.linkParamters?.searchTerm) {
      let data = await lastValueFrom(this.productServices
        .getProductBySearchTermCount(this.linkParamters.searchTerm)
      );
      return data.productsCount;
    }
    else {
      let data = await lastValueFrom(this.productServices.getAllProductsCount());
      return data.productsCount;
    }
  }

  updatePagesCount(pagesNumber: number) {
    this.lastPageNumber = pagesNumber | 1;
    this.pagesList = Array.from(Array(this.lastPageNumber).keys()).map(i => i + 1);
  }

}
