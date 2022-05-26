import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/categoery.service';
import { DataTransferService } from 'src/app/Services/DataTransferService/data-transfer.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css'],
})
export class ViewCategoryComponent implements OnInit {
  categoryID = '';
  myForm: FormGroup;
  img: any;
  constructor(
    private categoryService: CategoryService,
    private dataTransferService: DataTransferService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.myForm = this.formBuilder.group({
      name: [''],
      imageUrl: [''],
    });
  }

  onReturn() {
    this.router.navigate(['/list-categories']);
  }

  onEdit() {
    this.dataTransferService.clearData();
    this.dataTransferService.setData(this.categoryID);
    this.router.navigate(['/edit-category']);
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
    this.categoryID = this.dataTransferService.getData();
    if (this.categoryID != '') {
      this.categoryService.getCategoryNameById(this.categoryID).subscribe(
        (data) =>
          (this.myForm = this.formBuilder.group({
            name: [data.name],
          })),
        (err) => console.log(err)
      );
      this.categoryService.getCategoryImage(this.categoryID).subscribe(
        (data) => this.createImageFromBlob(data),
        (err) => console.log(err)
      );
    }else this.router.navigate(['/list-categories']);
  }
}
