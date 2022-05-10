import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Interfaces/IProduct';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
  }
  addToCart(){
    this.cartService.add({_id:"626c8e6db4573ed088c213e4",  name:'',
      rate: 2,
      price: 2,
      shortDescription: '',
      availability: true,
      imgURL: '',
      weight: 2,
      availableInventory: 2,
      longDescription: 'l',
      productInformation: 's'});
    // this.cartService.getCart().subscribe(res=>{
    //   // console.log('home function to add');
    //   // console.log('the new cart in the product array in server:');
    //   // console.log(res);

    // },err=>{
    //   console.log('error');
    // });
  }
  removeFromCart(){
    this.cartService.remove({_id:"626c8e6db4573ed088c213e4",  name:'',
    rate: 2,
    price: 2,
    shortDescription: '',
    availability: true,
    imgURL: '',
    weight: 2,
    availableInventory: 2,
    longDescription: 'l',
    productInformation: 's'});
    // this.cartService.getCart().subscribe(res=>{
    //   console.log('removed');
    //   console.log(res);

    // },err=>{
    //   console.log('error');
    // });
  }

}
