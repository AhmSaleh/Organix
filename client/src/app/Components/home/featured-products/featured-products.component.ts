import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { ProductServices } from 'src/app/Services/ProductServices/product-services.service';
import { IProduct } from 'src/app/Models/IProdcut';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent implements OnInit {

  featuredProducts: IProduct[] = [];
  
  constructor(private cartService: CartService, private productService: ProductServices) { }

  ngOnInit(): void {
   this.productService.getAllProducts().subscribe(data => {
      this.featuredProducts = data.slice(0, 8);
      console.log(this.featuredProducts);
    })
  }



  addToCart() {
    this.cartService.add({
      _id: '626c8e6db4573ed088c213d9',
      name: 'Yvor',
      rate: 5,
      price: 573.71,
      shortDescription:
        'Introduction of Oth Hormone into Periph Vein, Open Approach',
      availability: false,
      imgURL: 'http://dummyimage.com/557x438.png/cc0000/ffffff',
      weight: 1269,
      availableInventory: 78,
      longDescription:
        'Introduction of Other Hormone into Peripheral Vein, Open Approach',
      productInformation: 'Alpha thalassemia',
    });
  }

  removeFromCart() {
    this.cartService.remove({
      _id: '626c8e6db4573ed088c213d9',
      name: 'Yvor',
      rate: 5,
      price: 573.71,
      shortDescription:
        'Introduction of Oth Hormone into Periph Vein, Open Approach',
      availability: false,
      imgURL: 'http://dummyimage.com/557x438.png/cc0000/ffffff',
      weight: 1269,
      availableInventory: 78,
      longDescription:
        'Introduction of Other Hormone into Peripheral Vein, Open Approach',
      productInformation: 'Alpha thalassemia',
    });
  }
}
