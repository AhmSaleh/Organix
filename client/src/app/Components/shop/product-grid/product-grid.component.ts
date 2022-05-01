import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IProduct, productFetchParamters } from 'src/app/Models/IProdcut';
import { ProductServices } from 'src/app/Services/ProductServices/product-services.service';


@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {
  @Input() fetchParamters?: productFetchParamters;
  constructor(private productService: ProductServices) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes['fetchParamters'] && this.fetchParamters != undefined) {
      this.refreshProducts(this.fetchParamters);
    }
  }

  ngOnInit(): void { }


  refreshProducts(fetchParamters: productFetchParamters) {
    //TODO create single service to accept all filters
    console.log("fetching products with filters", fetchParamters)
    if (fetchParamters?.category) {
      this.productService.getProductByCategory(fetchParamters.category)
        .subscribe((data) => this.fillProducts(data.products));
    }
    else if (fetchParamters?.searchTerm) {
      this.productService.getProductBySearchTerm(fetchParamters.searchTerm)
        .subscribe(this.fillProducts);
    }
    else {
      // get all products
      this.productService.getAllProducts().subscribe(this.fillProducts);
    }
  }
  fillProducts = (data: IProduct[]) => {
    this.products = data;
  }
  products: IProduct[] = [];
}
