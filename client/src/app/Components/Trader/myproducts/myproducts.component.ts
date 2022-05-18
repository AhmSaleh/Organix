import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/Models/IProdcut';
import { AuthService } from 'src/app/Services/auth.service';
import { CategoryService } from 'src/app/Services/categoery.service';
import { DataTransferService } from 'src/app/Services/DataTransferService/data-transfer.service';
import { ProductServices } from 'src/app/Services/ProductServices/product-services.service';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css'],
})
export class MyproductsComponent implements OnInit {
  myProducts: any[] = [];
  tableHeads: string[] = [];
  toBeDeleted = '';
  constructor(
    private authService: AuthService,
    private productService: ProductServices,
    private dataTransferService: DataTransferService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  deleteClick(prodID: string) {
    this.toBeDeleted = prodID;
  }

  modalOnClose() {
    this.toBeDeleted = '';
  }

  confirmDelete(event: any) {
    if (this.toBeDeleted != '')
      this.productService
        .deleteProduct(this.toBeDeleted, this.authService.getToken())
        .subscribe(
          (data) => {
            this.ngOnInit();
          },
          (err) => console.log(err)
        );
  }

  editClick(prodID: string) {
    this.dataTransferService.clearData();
    this.dataTransferService.setData(prodID);
    this.router.navigate(['/edit-product']);
  }

  detailClick(prodID: string) {
    this.dataTransferService.clearData();
    this.dataTransferService.setData(prodID);
    this.router.navigate(['/view-product']);
  }

  ngOnInit(): void {
    this.productService
      .getProductByMerchent(this.authService.getUserId())
      .subscribe((data) => {
        data.map((d) =>
          this.categoryService.getCategoryNameById(d.categoryName).subscribe(
            (catData) => {
              d.categoryName = catData.name;
            },
            (err) => console.log(err)
          )
        );
        this.myProducts = data;
        this.tableHeads = Object.keys(this.myProducts[0]);
        this.tableHeads = this.tableHeads.filter(
          (f) =>
            f != 'imagesURL' &&
            f != 'imgURL' &&
            f != 'longDescription' &&
            f != '_id' &&
            f != '__v' &&
            f != 'merchantId'
        );
      });
  }
}
