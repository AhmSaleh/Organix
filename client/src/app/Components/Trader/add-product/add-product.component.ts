import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import ICategory from 'src/app/Models/ICategory';
import { AuthService } from 'src/app/Services/auth.service';
import { CategoryService } from 'src/app/Services/categoery.service';
import { ProductServices } from 'src/app/Services/ProductServices/product-services.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  validClass = ' is-valid ';
  invalidClass = ' is-invalid ';
  myForm: FormGroup;
  categories: ICategory[] = [];
  imageFile: any;
  formData: FormData = new FormData();
  imageString = '';

  constructor(
    private categoryService: CategoryService,
    private productService: ProductServices,
    private authService: AuthService,
    private router: Router
  ) {
    this.myForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.min(0), Validators.required]),
      availableInventory: new FormControl(null, [
        Validators.required,
        Validators.min(0),
      ]),
      weight: new FormControl(null, [Validators.required, Validators.min(0)]),
      shortDescription: new FormControl(null, [
        Validators.minLength(0),
        Validators.maxLength(70),
        Validators.required,
      ]),
      img: new FormControl(null, Validators.required),
      longDescription: new FormControl(null, Validators.required),
      productInformation: new FormControl(null, Validators.required),
      categoryName: new FormControl('', Validators.required),
    });
  }

  imgHasBeenTouched(event: any) {
    this.myForm.controls['img'].markAsTouched();
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageFile = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      this.myForm.patchValue({ img: this.imageFile });
      this.imageString = this.imageFile.name;
      this.myForm.controls['img'].markAsTouched();
      this.createImageFromBlob(this.imageFile);
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.formData.append('imgURL', this.myForm.value['img']);
      this.formData.append('name', this.myForm.value['name']);
      this.formData.append('price', this.myForm.value['price']);
      this.formData.append(
        'shortDescription',
        this.myForm.value['shortDescription']
      );
      this.formData.append(
        'availableInventory',
        this.myForm.value['availableInventory']
      );
      this.formData.append('weight', this.myForm.value['weight']);
      this.formData.append(
        'longDescription',
        this.myForm.value['longDescription']
      );
      this.formData.append(
        'productInformation',
        this.myForm.value['productInformation']
      );
      this.formData.append('categoryName', this.myForm.value['categoryName']);
      this.formData.append('merchantId', this.authService.getUserId());

      this.productService
        .addProductAny(this.formData, this.authService.getToken())
        .subscribe(
          (data) => {
            // console.log(data);
            this.router.navigate(['/myproducts']);
          },
          (err) => console.log(err)
        );
    }
  }

  onReset() {
    this.myForm.reset();
  }

  validationClass(str: string): String {
    if (this.myForm.controls[str].untouched) return '';
    return this.myForm.controls[str].valid
      ? this.validClass
      : this.invalidClass;
  }

  opacityClass(str: string) {
    return this.myForm.controls[str].pristine ||
      this.myForm.controls[str].invalid
      ? 'opacity-75'
      : '';
  }

  errorName(str: string): string {
    if (!this.myForm.controls[str].errors) return '';
    return Object.keys(this.myForm.controls[str].errors!)[0].toString();
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
