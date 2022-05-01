import { Component, OnInit } from '@angular/core';
import ICategory from 'src/app/Models/ICategory';
import { CategoryService } from 'src/app/Services/categoery.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories:ICategory[] = [];
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories = data;
    })
  }

}
