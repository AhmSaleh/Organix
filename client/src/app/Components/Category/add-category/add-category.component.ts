import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CategoryService } from 'src/app/Services/categoery.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  validClass = ' is-valid ';
  invalidClass = ' is-invalid ';
  myForm: FormGroup;
  imageFile: any;
  formData: FormData = new FormData();
  imageString = '';
  oldImg: any;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.formData.append('name', this.myForm.value['name']);
      this.formData.append('imageUrl', this.myForm.value['imageUrl']);

      this.categoryService
        .addCategory(this.formData, this.authService.getToken())
        .subscribe(
          (data) => this.router.navigate(['/list-categories']),
          (err) => console.log(err)
        );
    } else {
      this.myForm.markAllAsTouched();
    }
  }

  onReset() {
    this.myForm.reset();
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      this.myForm.patchValue({ imageUrl: this.imageFile });
      this.imageString = this.imageFile.name;
      this.myForm.controls['imageUrl'].markAsTouched();
      this.createImageFromBlob(this.imageFile);
    }
  }

  imgHasBeenTouched(event: any) {
    this.myForm.controls['imageUrl'].markAsTouched();
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

  ngOnInit(): void {}
}
