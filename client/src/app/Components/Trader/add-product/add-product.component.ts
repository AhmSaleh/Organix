import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import ICategory from 'src/app/Models/ICategory';
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

  constructor(
    private categoryService: CategoryService,
    private productService: ProductServices
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
      categoryName: new FormControl(null, Validators.required),
    });
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

  imageFile: any;
  formdata: FormData = new FormData();

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = <File>event.target.files[0];
    }
  }

  onSubmit() {
    this.formdata.append('file', this.imageFile, this.imageFile.name);
    console.log(this.formdata);
    console.log(this.formdata.get('file'));
    if (this.myForm.valid) {
      console.log('sending...');
      this.productService.addProduct(this.myForm.value).subscribe(
        (data) => console.log(data),
        (err) => console.log(err)
      );
      //''.split('').length
    }
  }

  onReset() {
    this.myForm.reset();
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
