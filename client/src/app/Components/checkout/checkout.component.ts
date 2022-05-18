import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ICartView } from 'src/app/Interfaces/ICartView';
import { IOrderData } from 'src/app/Interfaces/IOrder';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';

declare let paypal: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;
  constructor(private cartService: CartService, private auth: AuthService) {
    this.cart = this.cartService.getCart();
  }
  products: any;
  cart: ICartView;

  CheckOut() {
    let orderData: IOrderData = {
      UserID: this.auth.getUserId(),
      Products: this.products,
      Address: 'ddd',
      Method: 1,
    };
    fetch('http://localhost:3000/api/order/create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        Notify.failure("Coudn't Checkout!", {
          closeButton: true,
        });
      });
  }

  ngOnInit(): void {
    this.products = this.cart.Products.map((p) => {
      return { ID: p.product._id, Count: p.Count };
    });
    let UserID = this.auth.getUserId();
    let orderData: IOrderData = {
      UserID: UserID,
      Products: this.products,
      Address: 'ddd',
      Method: 0,
    };

    paypal.Button.render(
      {
        env: 'sandbox', // Or 'production'
        // Set up the payment:
        // 1. Add a payment callback
        payment: function () {
          // 2. Make a request to your server
          return fetch('http://localhost:3000/api/order/create', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(orderData),
          })
            .then((res) => {
              console.log(res);
              if (res.ok) return res.json();
              return res.json().then((json) => {
                alert(JSON.stringify(json));
                Promise.reject(json);
              });
            })
            .then(({ id }) => {
              return id;
            })
            .catch((e) => {
              console.log(e.error);
            });
        },

        onAuthorize: async function (data: any, actions: any) {
          // 2. Make a request to your server
          return fetch('http://localhost:3000/api/order/capture', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({ UserID: UserID, data }),
          }).then(function (res) {
            console.log(res);
          });
        },
        // onApprove: (data:any, actions:any) => {
        //   return actions.order.capture().then(function(orderData:any) {
        //     // Successful capture! For dev/demo purposes:
        //     console.log(data)
        //     console.log(actions)
        //     console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
        //     const transaction = orderData.purchase_units[0].payments.captures[0];
        //     alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);

        //   });
        // },
        style: {
          color: 'gold',
          shape: 'rect',
          //layout: "vertical",
          size: 'responsive',
        },
        commit: true,
      },
      '#paypal-button'
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
