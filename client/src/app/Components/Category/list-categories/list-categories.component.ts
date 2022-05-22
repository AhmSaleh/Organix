import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CategoryService } from 'src/app/Services/categoery.service';
import { DataTransferService } from 'src/app/Services/DataTransferService/data-transfer.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css'],
})
export class ListCategoriesComponent implements OnInit {
  categories: any;
  toBeDeleted = '';
  constructor(
    private authService: AuthService,
    private dataTransferService: DataTransferService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  editClick(catID: string) {
    this.dataTransferService.clearData();
    this.dataTransferService.setData(catID);
    this.router.navigate(['/edit-category']);
  }

  detailClick(catID: string) {
    this.dataTransferService.clearData();
    this.dataTransferService.setData(catID);
    this.router.navigate(['/view-category']);
  }

  deleteClick(catID: string) {
    this.toBeDeleted = catID;
  }

  modalOnClose() {
    this.toBeDeleted = '';
  }

  confirmDelete(event: any) {
    if (this.toBeDeleted != '')
      this.categoryService
        .deleteCategory(this.toBeDeleted, this.authService.getToken())
        .subscribe(
          (data) => {
            this.ngOnInit();
          },
          (err) => console.log(err)
        );
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (err) => console.log(err)
    );
  }
}
