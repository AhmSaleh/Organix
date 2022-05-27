import ProductService from "./ProductService";
import {IOrderData} from './Order Interfaces/IOrderData'
import OrderModel, { OrderStatus, PaymentMethod, PaymentStatus } from "../model/OrderModel";
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const paypalClient = require('./payPalClient');


const buildRequestBody = async (data:IOrderData)=> {

   let productsIDs = data.Products.map(p => {return p.ID});
   let products = await ProductService.getProductList(productsIDs);

   let failed:any = [];

   let items =  products.map((item,index)=>{
    if(item.availableInventory < data.Products[index].Count)
    failed.push(item);
    return {
     "name":item.name,
     "description": item.shortDescription ,
     //"sku": "sku01",
     "unit_amount": {
         "currency_code": "USD",
         "value":item.price
     },
    //  "tax": {
    //      "currency_code": "USD",
    //      "value": "10.00"
    //  },
     "quantity":data.Products[index].Count,
    // "category": "PHYSICAL_GOODS"
 }
})


    if (failed.length > 0) {
        return failed;
    }

    let mapped = products.map((p,i) =>{
        return {
          ProductID: p._id, Count: data.Products[i].Count ,Price:p.price
        }
      })

    let updateArr = products.map((p, i) => {

        return {
          updateOne: {
            filter: { "_id": p._id },
            update: { $inc: { "availableInventory": - data.Products[i].Count } },
          },
        };
      });
    
    
    
    ProductService.updateBulk(updateArr);
    
    

  
   
   const productsPrice = products.reduce((sum,item,index) => {
    return sum + item.price * data.Products[index].Count
  }, 0).toFixed(2);




  var newOrder = {
    UserID: data.UserID,
    Date: new Date(),
    Products: mapped,
    Address:data.Address,
    OrderStatus: OrderStatus.Pending,
    Payment: {
      Status: PaymentStatus.Pending,
      Method: PaymentMethod.PayPal,
    },Gross:productsPrice
  };

  var order = new OrderModel(newOrder);
  order.save();

//   const tax_total = data.Products.reduce((sum,item,index)=>{
//     return sum + 10 * data.Products[index].Count
//   },0).toFixed(2);

//   const shipping = (10).toFixed(2);
//   const handling = (10).toFixed(2);
//   const discount = (10).toFixed(2);
 // const total =(parseFloat(productsPrice) + parseFloat(tax_total) + parseFloat(handling) + parseFloat(shipping) - parseFloat(discount)).toFixed(2);
  const total = parseFloat(productsPrice).toFixed(2)
    return {
        "intent": "CAPTURE",
        // "application_context": {
        //     "return_url": "https://www.success.com",
        //     "cancel_url": "https://www.fail.com",
        //     "brand_name": "EXAMPLE INC",
        //     "locale": "en-US",
        //     "landing_page": "BILLING",
        //     "shipping_preference": "SET_PROVIDED_ADDRESS",
        //     "user_action": "CONTINUE"
        // },
        "purchase_units": [
            {
                // "reference_id": "PUHF",
                // "description": "Sporting Goods",
                // "custom_id": "CUST-HighFashions",
                // "soft_descriptor": "HighFashions",
                "amount": {
                    "currency_code": "USD",
                    "value":total,
                    "breakdown": {
                        "item_total": {
                            "currency_code": "USD",
                            "value": productsPrice
                        },
                        // "shipping": {
                        //     "currency_code": "USD",
                        //     "value": shipping
                        // },
                        // "handling": {
                        //     "currency_code": "USD",
                        //     "value": handling
                        // },
                        // "tax_total": {
                        //     "currency_code": "USD",
                        //     "value":tax_total
                        // },
                        // "discount": {
                        //     "currency_code": "USD",
                        //     "value": discount
                        // }
                    }
                },
                "items": items ,
                "shipping": {
                    "method": "United States Postal Service",
                    "name": {
                        "full_name":"name here"
                    },
                    "address": {
                        "address_line_1": "123 Townsend St",
                        //"address_line_2": "Floor 6",
                        "admin_area_2": "San Francisco",
                        //"admin_area_1": "CA",
                        "postal_code": "94107",
                        "country_code": "US"
                    }
                }
            }
        ]
    };
}


/**
 * This is the sample function which can be sued to create an order. It uses the
 * JSON body returned by buildRequestBody() to create an new Order.
 */
async function createOrder(data:IOrderData,debug=false) {
    try {

        let body = await buildRequestBody(data)
        if(Array.isArray(body)){
            return body;
        }

        const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
        request.headers["prefer"] = "return=representation";
        request.requestBody(body);
        const response = await paypalClient.client().execute(request);
        if (debug){
            console.log("Status Code: " + response.statusCode);
            console.log("Status: " + response.result.status);
            console.log("Order ID: " + response.result.id);
            console.log("Intent: " + response.result.intent);
            console.log("Links: ");
            response.result.links.forEach((item:any, index:any) => {
                let rel = item.rel;
                let href = item.href;
                let method = item.method;
                let message = `\t${rel}: ${href}\tCall Type: ${method}`;
                console.log(message);
            });
            console.log(`Gross Amount: ${response.result.purchase_units[0].amount.currency_code} ${response.result.purchase_units[0].amount.value}`);
            // To toggle print the whole body comment/uncomment the below line
            console.log(JSON.stringify(response.result, null, 4));
        }
        return {id:response.result.id};
    }
    catch (e:any) {
      return { error: e.message };
    }

}

/**
 * Exports the Create Order function. If needed this can be invoked from the
 * order modules to execute the end to flow like create order, retrieve, capture
 * and refund(Optional)
 */


 async function captureOrder(data:any, debug=false) {
    try {
        const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(data.data.orderID);
        request.requestBody({});
        const response = await paypalClient.client().execute(request);
        if (debug){
            console.log("Status Code: " + response.statusCode);
            console.log("Status: " + response.result.status);
            console.log("Order ID: " + response.result.id);
            console.log("Links: ");
            response.result.links.forEach((item:any, index:any) => {
                let rel = item.rel;
                let href = item.href;
                let method = item.method;
                let message = `\t${rel}: ${href}\tCall Type: ${method}`;
                console.log(message);
            });
            console.log("Capture Ids:");
            response.result.purchase_units.forEach((item:any,index:any)=>{
            	item.payments.captures.forEach((item:any, index:any)=>{
            		console.log("\t"+item.id);
                });
            });
            // To toggle print the whole body comment/uncomment the below line
            console.log(JSON.stringify(response.result, null, 4));
        }

        if(response.result.status == 'COMPLETED'){
            //find order with this id and this gross
            //update order state
            let gross = response.result.purchase_units[0].payments.captures[0].seller_receivable_breakdown.gross_amount.value
            let UserID =data.UserID
            OrderModel.updateOne({"UserID":UserID,"Payment.Status":PaymentStatus.Pending,"Payment.Method":PaymentMethod.PayPal,"Gross":gross},{"Payment.Status":PaymentStatus.Paid}).exec();
        }else{
            //revert state
        }

        return response;
    }
    catch (e) {
        console.log(e)
        console.log('paypal service capture');
    }
}








export default {createOrder:createOrder,captureOrder:captureOrder};