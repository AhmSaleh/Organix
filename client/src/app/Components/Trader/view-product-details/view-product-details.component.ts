import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/categoery.service';
import { DataTransferService } from 'src/app/Services/DataTransferService/data-transfer.service';
import { ProductServices } from 'src/app/Services/ProductServices/product-services.service';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.css'],
})
export class ViewProductDetailsComponent implements OnInit {
  constructor(
    private productService: ProductServices,
    private dataTransferService: DataTransferService,
    private categoryService: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  productID = '';
  myForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    weight: this.formBuilder.control(['']),
    productInformation: this.formBuilder.control(['']),
    categoryName: this.formBuilder.control(['']),
    availableInventory: this.formBuilder.control(['']),
    shortDescription: this.formBuilder.control(['']),
    longDescription: this.formBuilder.control(['']),
    imgURL: this.formBuilder.control(['']),
  });
  img: any;

  onReturn() {
    this.router.navigate(['/myproducts']);
  }

  onEdit() {
    this.dataTransferService.clearData();
    this.dataTransferService.setData(this.productID);
    this.router.navigate(['/edit-product']);
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.img = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  ngOnInit(): void {
    this.productID = this.dataTransferService.getData();
    if (this.productID != '') {
      this.productService.getProduct(this.productID).subscribe(
        (data) => {
          this.categoryService.getCategoryNameById(data.categoryName).subscribe(
            (catData) => {
              data.categoryName = catData.name;
              let myObj: any = {};
              let keys = Object.keys(data);
              const myData = data as any;
              for (let key of keys)
                if (
                  key != 'imagesURL' &&
                  key != '_id' &&
                  key != '__v' &&
                  key != 'merchantId'
                )
                  myObj[key] = [myData[key]];
              this.myForm = this.formBuilder.group(myObj);
            },
            (err) => console.log(err)
          );
        },
        (err) => console.log(err)
      );
      this.productService.getProductImage(this.productID).subscribe(
        (data) => {
          this.createImageFromBlob(data);
        },
        (err) => console.log(err)
      );
    }
  }
}
