import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/categoery.service';
import ICategory from 'src/app/Models/ICategory';
import { ProductServices } from 'src/app/Services/ProductServices/product-services.service';
import { IProduct } from 'src/app/Models/IProdcut';

@Component({
  selector: 'app-categories-carousel',
  templateUrl: './categories-carousel.component.html',
  styleUrls: ['./categories-carousel.component.css']
})
export class CategoriesCarouselComponent implements OnInit {
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  categories: ICategory[] = [];

  carouselOptions = {
    'loop': true,
    'item': 4,
    'slideBy': 5,
    'autoplay': true,
    'autoplaySpeed':2000,
    'autoplayTimeout': 4000,
    'autoplayHoverPause': true,
    'dots': false,
    'responsive': {
      0: {
        items: 1,
        nav: true
      },
      480: {
        items: 2,
        nav: true
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 4,
        nav: false
      }
    }
  }
  constructor(private categoryService: CategoryService, private productService: ProductServices) {}

  ngOnInit(): void { 
    this.categoryService.getCategories().subscribe(data=>{
      this.categories = data;
      console.log(this.categories);
      console.log(this.images[0]);
    })
  }

}
