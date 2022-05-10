import ProductService from "./ProductService";

import OrderService from "./OrderService";


/**
 * PayPal SDK dependency
 */
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');



/**
 * PayPal HTTP client dependency
 */
const paypalClient = require('./payPalClient');

// const Environment =
//   process.env.NODE_ENV === "production"
//     ? checkoutNodeJssdk.core.LiveEnvironment
//     : checkoutNodeJssdk.core.SandboxEnvironment
// const paypalClient = new checkoutNodeJssdk.core.PayPalHttpClient(
//   new Environment(
//     process.env.PAYPAL_CLIENT_ID,
//     process.env.PAYPAL_CLIENT_SECRET
//   )
// )





/**
 * Setting up the JSON request body for creating the Order. The Intent in the
 * request body should be set as "CAPTURE" for capture intent flow.
 * 
 */


//  {
//     "name": "T-Shirt",
//     "description": "Green XL",
//     "sku": "sku01",
//     "unit_amount": {
//         "currency_code": "USD",
//         "value": "90.00"
//     },
//     "tax": {
//         "currency_code": "USD",
//         "value": "10.00"
//     },
//     "quantity": "1",
//     "category": "PHYSICAL_GOODS"
// }

interface IOrderData {
    UserID:string,
   Products:{
    ID:string,
    Count:number}[],
}
//TODO: get user data from database and insert it

const buildRequestBody = async (data:IOrderData)=> {

   let productsIDs = data.Products.map(p => {return p.ID});
   let products = await ProductService.getProductList(productsIDs);

    //TODO: check availability

   let mapped =  products.map((item,index)=>{
    return {
     "name":item.name,
     "description": item.shortDescription ,
     //"sku": "sku01",
     "unit_amount": {
         "currency_code": "USD",
         "value":item.price
     },
     "tax": {
         "currency_code": "USD",
         "value": "10.00"
     },
     "quantity":data.Products[index].Count,
     "category": "PHYSICAL_GOODS"
 }
})
   
   const productsPrice = products.reduce((sum,item,index) => {
    return sum + item.price * data.Products[index].Count
  }, 0).toFixed(2);

  const tax_total = data.Products.reduce((sum,item,index)=>{
    return sum + 10 * data.Products[index].Count
  },0).toFixed(2);

  const shipping = (10).toFixed(2);
  const handling = (10).toFixed(2);
  const discount = (10).toFixed(2);
  const total =(parseFloat(productsPrice) + parseFloat(tax_total) + parseFloat(handling) + parseFloat(shipping) - parseFloat(discount)).toFixed(2);

    return {
        "intent": "CAPTURE",
        "application_context": {
            "return_url": "https://www.success.com",
            "cancel_url": "https://www.fail.com",
            "brand_name": "EXAMPLE INC",
            "locale": "en-US",
            "landing_page": "BILLING",
            "shipping_preference": "SET_PROVIDED_ADDRESS",
            "user_action": "CONTINUE"
        },
        "purchase_units": [
            {
                "reference_id": "PUHF",
                "description": "Sporting Goods",
                "custom_id": "CUST-HighFashions",
                "soft_descriptor": "HighFashions",
                "amount": {
                    "currency_code": "USD",
                    "value":total,
                    "breakdown": {
                        "item_total": {
                            "currency_code": "USD",
                            "value": productsPrice
                        },
                        "shipping": {
                            "currency_code": "USD",
                            "value": shipping
                        },
                        "handling": {
                            "currency_code": "USD",
                            "value": handling
                        },
                        "tax_total": {
                            "currency_code": "USD",
                            "value":tax_total
                        },
                        "discount": {
                            "currency_code": "USD",
                            "value": discount
                        }
                    }
                },
                "items": mapped ,
                "shipping": {
                    "method": "United States Postal Service",
                    "name": {
                        "full_name":"name here"
                    },
                    "address": {
                        "address_line_1": "123 Townsend St",
                        "address_line_2": "Floor 6",
                        "admin_area_2": "San Francisco",
                        "admin_area_1": "CA",
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
        const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
        request.headers["prefer"] = "return=representation";
        request.requestBody(await buildRequestBody(data));
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
        console.log('?????????');
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
        return response;
    }
    catch (e) {
        console.log(e)
        console.log('paypal service capture');
    }
}




export default {createOrder:createOrder,captureOrder:captureOrder};