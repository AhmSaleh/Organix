import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ICategory from 'src/app/Models/ICategory';
import { IProduct } from 'src/app/Models/IProdcut';
import { AuthService } from 'src/app/Services/auth.service';
import { CategoryService } from 'src/app/Services/categoery.service';
import { DataTransferService } from 'src/app/Services/DataTransferService/data-transfer.service';
import { ProductServices } from 'src/app/Services/ProductServices/product-services.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  ogData: IProduct | undefined = undefined;
  productID: string = '';
  myForm: FormGroup;
  formData: FormData = new FormData();
  categories: ICategory[] = [];
  validClass = ' is-valid ';
  invalidClass = ' is-invalid ';
  imgString = '';
  oldImg: any;
  newImg: any;
  editable: boolean = false;
 

  testimg: any;
  constructor(
    private authService: AuthService,
    private dataTransferService: DataTransferService,
    private productService: ProductServices,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.myForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.productID = this.dataTransferService.getData();
    if (this.productID != '') {
      this.productService.getProduct(this.productID).subscribe(
        (data) => {
          this.ogData = data;
          this.setItemData();
        },
        (err) => console.log(err)
      );
      this.categoryService.getCategories().subscribe((data) => {
        this.categories = data;
      });
      this.productService.getProductImage(this.productID).subscribe(
        (data) => {
          this.createImageFromBlob(data);
        },
        (err) => {
          console.log(err);
          console.log('somewhere here');
          this.oldImg = this.newImg = null;
          this.myForm.patchValue({ imgURL: null });
        }
      );
    } 
    else this.router.navigate(['/myproducts']);
  }

  reverseEdit() {
    this.editable = !this.editable;
  }
  onReturn() {
    this.router.navigate(['/myproducts']);
  }
  
  onReset() {
    this.myForm?.reset();
  }

  onSubmit() {
    if (this.myForm.valid) {
      let keys = Object.keys(this.myForm.controls);
      for (let key of keys)
        if (key != 'imgURL') this.formData.append(key, this.myForm.value[key]);

      this.formData.append('merchantId', this.authService.getUserId());
      if (this.newImg) this.formData.append('imgURL', this.newImg);
      else this.formData.append('imgURL', this.myForm.value['imgURL']);

      this.productService
        .updateProduct(
          this.productID,
          this.formData,
          this.authService.getToken()
        )
        .subscribe(
          (data) => this.router.navigate(['/myproducts']),
          (err) => console.log(err)
        );
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.oldImg = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.newImg = event.target.files[0];
      this.myForm.patchValue({ imgURL: this.newImg });
      this.myForm.controls['imgURL'].markAsTouched();
      this.createImageFromBlob(this.newImg);
    }
  }

  validationClass(str: string): String {
    if (this.myForm!.controls[str].untouched) return '';
    return this.myForm!.controls[str].valid
      ? this.validClass
      : this.invalidClass;
  }

  opacityClass(str: string) {
    return this.myForm!.controls[str].pristine ||
      this.myForm!.controls[str].invalid
      ? 'opacity-75'
      : '';
  }

  errorName(str: string): string {
    if (!this.myForm!.controls[str].errors) return '';
    return Object.keys(this.myForm!.controls[str].errors!)[0].toString();
  }

  setItemData() {
    this.myForm = this.formBuilder.group({
      name: [this.ogData!.name, Validators.required],
      imgURL: [this.ogData!.imgURL, Validators.required],
      price: [
        this.ogData!.price,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      weight: [
        this.ogData!.weight,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      productInformation: [
        this.ogData!.productInformation,
        Validators.required,
      ],
      shortDescription: [
        this.ogData!.shortDescription,
        Validators.compose([
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(70),
        ]),
      ],
      longDescription: [this.ogData!.longDescription, Validators.required],
      categoryName: [this.ogData!.categoryName, Validators.required],
      availableInventory: [
        this.ogData!.availableInventory,
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
    });
    this.imgString = this.ogData!.imgURL;
    let keys = Object.keys(this.myForm.controls);
    for (let key of keys) this.myForm.controls[key].markAsDirty();
    this.myForm.markAllAsTouched();
  }

}
