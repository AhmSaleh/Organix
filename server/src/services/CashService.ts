import { IOrderData } from "./Order Interfaces/IOrderData";
import ProductService from "./ProductService";
import OrderModel, {
  IOrder,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "../model/OrderModel";

async function createOrder(data: IOrderData) {
  let productsIDs = data.Products.map((p) => {
    return p.ID;
  });
  let products = await ProductService.getProductList(productsIDs);

  let failed:any = [];

let mapped = products.map((p,i) =>{
  if(p.availableInventory < data.Products[i].Count)
  failed.push(p);
  return {
    ProductID: p._id, Count: data.Products[i].Count ,Price:p.price
  }
})


if (failed.length > 0) {
  return failed;
}



let updateArr = products.map((p, i) => {

    return {
      updateOne: {
        filter: { "_id": p._id },
        update: { $inc: { "availableInventory": - data.Products[i].Count } },
      },
    };
  });



ProductService.updateBulk(updateArr);


  var newOrder = {
    UserID: data.UserID,
    Date: new Date(),
    Products: mapped,
    Address:data.Address,
    OrderStatus: OrderStatus.Pending,
    Payment: {
      Status: PaymentStatus.Pending,
      Method: PaymentMethod.Cash,
    },
  };

  var order = new OrderModel(newOrder);
  order.save();
  return "Order Created";
}
export default { createOrder: createOrder };
