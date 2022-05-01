import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Models/IProdcut';
import { ProductService } from 'src/app/Services/ProductServices/get-all.service';


@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data=>{
      this.products=data;
    });
  }

  products :IProduct[]=[];
}
