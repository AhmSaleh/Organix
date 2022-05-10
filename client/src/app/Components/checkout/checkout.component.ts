import { Component,  ElementRef,  OnInit, ViewChild } from '@angular/core';

declare let paypal:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypal',{static:true}) paypalElement! :ElementRef;
  constructor() { 
    
  }
  

  ngOnInit(): void {
    var orderData = {
      UserID:"id",
      Products: [
        { ID: "626c8e6db4573ed088c213d9", Count: 3 },
        { ID: "626c8e6db4573ed088c213da", Count: 5 },
      ]
    };
  
  //   paypal
  //   .Buttons({
  //       createOrder: () => {
  //         fetch("http://localhost:3000/api/order/create", {
  //         method: "POST",
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //         body: JSON.stringify(orderData),
  //       })
  //         .then((res) => {
  //           if (res.ok) return res.json();
  //           return res.json().then((json) => Promise.reject(json));
  //         })
  //         .then(({ id }) => {
  //           return id;
  //         })
  //         .catch((e) => {
  //           console.log(e.error);
  //         });
  //       },
  //       onApprove: async (data:any) => {
  //         return fetch('http://localhost:3000/api/order/capture',{method:'POST',headers:{
  //           "content-type": "application/json"},
  //           body:JSON.stringify({paymentID: data.paymentID,payerID:data.payerID})
  //         ,})
  //           .then(function(res) {
  //             alert(res);
  //           });
  //       },
  //       onError: (err: any) => {
  //         console.log(err);
  //       },
        
  //     })
  //     .render(this.paypalElement.nativeElement);

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
          body: JSON.stringify(orderData),
        })
          .then((res) => {
            if (res.ok) return res.json();
            return res.json().then((json) => Promise.reject(json));
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
      onAuthorize: function (data:any) {
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
        layout: "vertical",
      },
    },
    "#paypal-button"
  );


  }
}
