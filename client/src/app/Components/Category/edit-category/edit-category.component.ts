import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CategoryService } from 'src/app/Services/categoery.service';
import { DataTransferService } from 'src/app/Services/DataTransferService/data-transfer.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  myForm: FormGroup;
  oldImg: any;
  newImg: any;
  formData: FormData = new FormData();
  categoryID = '';
  validClass = ' is-valid ';
  invalidClass = ' is-invalid ';

  constructor(
    private authService: AuthService,
    private dataTransferService: DataTransferService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.myForm = new FormGroup({});
  }

  onReset() {
    this.myForm?.reset();
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.formData.append('name', this.myForm.value['name']);
      this.formData.append('imageUrl', this.myForm.value['imageUrl']);

      this.categoryService
        .updateCategory(
          this.categoryID,
          this.formData,
          this.authService.getToken()
        )
        .subscribe(
          (data) => {
            this.router.navigate(['/list-categories']);
          },
          (err) => console.log(err)
        );
    }
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.newImg = event.target.files[0];
      this.myForm.patchValue({ imageUrl: this.newImg });
      this.myForm.controls['imageUrl'].markAsTouched();
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

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.oldImg = reader.result;
        this.newImg = null;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  ngOnInit(): void {
    this.categoryID = this.dataTransferService.getData();
    if (this.categoryID != '') {
      this.categoryService.getCategoryNameById(this.categoryID).subscribe(
        (data) => {
          this.myForm = this.formBuilder.group({
            name: [data.name, Validators.required],
            imageUrl: [data.imageUrl, Validators.required],
          });
          this.myForm.controls['name'].markAsDirty();
          this.myForm.controls['imageUrl'].markAsDirty();
          this.myForm.markAllAsTouched();
        },
        (err) => console.log(err)
      );
      this.categoryService.getCategoryImage(this.categoryID).subscribe(
        (img) => {
          this.createImageFromBlob(img);
        },
        (err) => {
          console.log(err);
          this.oldImg = this.newImg = null;
          this.myForm.patchValue({ imageUrl: this.newImg });
        }
      );
    } else this.router.navigate(['/list-categories']);
  }
}
