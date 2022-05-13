import { Component,  ElementRef,  OnInit, ViewChild } from '@angular/core';
import { ICartView } from 'src/app/Interfaces/ICartView';
import { IOrderData } from 'src/app/Interfaces/IOrder';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';

declare let paypal:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypal',{static:true}) paypalElement! :ElementRef;
  constructor(private cartService:CartService,private auth:AuthService) { 
    this.cart = this.cartService.getCart();
  }
  products:any;
  cart:ICartView;
  ngOnInit(): void {
    this.products = this.cart.Products.map(p=>{
      return {ID:p.product._id,Count:p.Count}
    })

    var orderData:IOrderData={
      UserID:this.auth.getUserId(),
      Products:this.products,
      Address:'',
      Method:0
    }
  

  paypal.Button.render(
    {
      env: "sandbox", // Or 'production'
      // Set up the payment:
      // 1. Add a payment callback
      payment: function () {
        // 2. Make a request to your server
        return fetch("http://localhost:3000/api/order/create", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            "UserID":"627b012461a3eff78257a464",
            "Products":[{"ID": "626c8e6db4573ed088c213da", "Count": 500},{"ID": "626c8e6db4573ed088c213d9", "Count": 5}],
            "Address":"my address",
            "Method":0
        
        }),
        })
          .then((res) => {
            if (res.ok) return res.json();
            return res.json().then((json) => {
              //alert(JSON.stringify(json));
              Promise.reject(json)});
          })
          .then(({ id }) => {
            return id;
          })
          .catch((e) => {
            console.log(e.error);
          });
      },
      // Execute the payment:
      // 1. Add an onAuthorize callback
      onAuthorize: async function (data:any) {
        // 2. Make a request to your server
        return fetch("http://localhost:3000/api/order/capture", {method:'POST',headers:{
                     "content-type": "application/json"},
                    body:JSON.stringify({paymentID: data.paymentID,payerID:data.payerID,data})
                  ,})
                    .then(function(res) {
                      alert(res);
                    });
      },
      style: {
        color: "gold",
        shape: "rect",
        //layout: "vertical",
        size:"responsive"
      },commit: true,
    },
    "#paypal-button"
  );


  }


  calcCartTotal(): number {
    let cartTotal = 0;
    for (let product of this.cart.Products) {
      cartTotal += product.Count * product.product.price;
    }
    return cartTotal;
  }
}
