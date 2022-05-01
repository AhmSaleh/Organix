import { Component, Input, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    console.log(this.fetchParamters);
    this.productService.getAllProducts().subscribe(data=>{
      this.products=data;
    });
  }

  products :IProduct[]=[];
}
