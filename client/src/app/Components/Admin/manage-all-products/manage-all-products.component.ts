import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { ProductServices } from 'src/app/Services/ProductServices/product-services.service';

@Component({
  selector: 'app-manage-all-products',
  templateUrl: './manage-all-products.component.html',
  styleUrls: ['./manage-all-products.component.css'],
})
export class ManageAllProductsComponent implements OnInit {
  products: any;
  filteredProduct: any;
  tableHeads: any;
  toBeDeleted = ';';
  constructor(
    private authService: AuthService,
    private productService: ProductServices
  ) {}

  search(value: string): void {
    this.filteredProduct = this.products.filter(
      (product: any) =>
        product.name.first.toLowerCase().includes(value.toLowerCase()) ||
        product.name.last.toLowerCase().includes(value.toLowerCase()) ||
        product.email.toLowerCase().includes(value.toLowerCase()) ||
        product.role.toLowerCase().includes(value.toLowerCase())
    );
  }

  deleteClick(id: string) {
    this.toBeDeleted = id;
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
            // for (let i = 0; i < this.products.length; ++i) {
            //   if (this.products[i]._id == this.toBeDeleted) {
            //     this.products.splice(i, 1);
            //     break;
            //   }
            // }
            // this.products = this.products.filter(
            //   (f: any) => f._id != this.toBeDeleted
            // );
          },
          (err) => console.log(err)
        );
  }

  ngOnInit(): void {
    this.productService.getAllProductsAdmin().subscribe(
      (data) => {
        this.products = data;
        this.tableHeads = Object.keys(this.products[0]);
        this.tableHeads = this.tableHeads.filter(
          (f: any) =>
            f != 'imagesURL' &&
            f != 'imgURL' &&
            f != 'longDescription' &&
            f != '_id' &&
            f != '__v' &&
            f != 'merchantId' &&
            f != 'availability'
        );
      },
      (err) => console.log(err)
    );
  }
}
