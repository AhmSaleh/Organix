import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Interfaces/IProduct';
import { IUser } from 'src/app/Models/IUser';
import { AuthService } from 'src/app/Services/auth.service';
import { ProductServices } from 'src/app/Services/ProductServices/product-services.service';
import { UserService } from 'src/app/Services/UserServices/user.service';

@Component({
  selector: 'app-update-product-status',
  templateUrl: './update-product-status.component.html',
  styleUrls: ['./update-product-status.component.css'],
})
export class UpdateProductStatusComponent implements OnInit {
  products: any;
  selectedProduct: any;
  merchent: any;

  constructor(
    private productService: ProductServices,
    private authService: AuthService,
    private userService: UserService
  ) {}

  detailClick(prodID: string) {
    this.selectedProduct = this.products.filter((f: any) => f._id == prodID)[0];
    this.userService.getUserById(this.selectedProduct.merchantId).subscribe(
      (data) => (this.merchent = data[0]),
      (err) => console.log(err)
    );
  }

  changeStatus(prodID: string) {
    this.selectedProduct = this.products.filter((f: any) => f._id == prodID)[0];
  }

  UpdateProductStatus(status: string) {
    this.productService
      .updateProductStatus(
        this.selectedProduct._id,
        status,
        this.authService.getToken()
      )
      .subscribe(
        (data) => {
          this.ngOnInit();
        },
        (err) => console.log(err)
      );
  }

  // modalDetailOnClose() {
  //   this.selectedProduct = undefined;
  // }

  // modalStatusOnClose() {
  //   this.selectedProduct = undefined;
  // }

  ngOnInit(): void {
    this.productService.getPendingProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (err) => console.log(err)
    );
  }
}
