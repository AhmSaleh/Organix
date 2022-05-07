import { Component, Input, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IProduct } from 'src/app/Models/IProdcut';
import { IUser } from 'src/app/Models/IUser';
import { ProductServices } from 'src/app/Services/ProductServices/product-services.service';
import { UserService } from 'src/app/Services/UserServices/user.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product: IProduct = {} as IProduct;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductServices,
    private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productService.getProduct(params['id'])
        .subscribe((product) => {
          this.product = product;
          this.selectedImage = this.product.imgURL;
          this.getMerchantInfo(product.merchantId);
        });

    })
  }

  private getMerchantInfo(id: string): void {
    this.userService.getMerchantInfo(this.product.merchantId).subscribe((merchant) => {
      this.merchant = merchant;
    });
  }

  selectedImage: string = "";
  merchant: IUser = {} as IUser;
  updateSelected(event: MouseEvent) {
    const imgElem = event.target as HTMLImageElement;
    this.selectedImage = imgElem.src;
  }
}
