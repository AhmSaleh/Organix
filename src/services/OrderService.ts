import OrderModel from "../model/OrderModel";
import { IOrder } from "../model/OrderModel";
import paypal from '../services/PaypalService'
import CashService from "./CashService";
import { IOrderData } from "./Order Interfaces/IOrderData";
import ProductService from "./ProductService";



const getAll = () => {
  return OrderModel.find({}).populate('Products.ProductID');
};

const getAllUserID = async (UserID: string) => {
  return await OrderModel.find({ UserID: UserID,$or:[{'Payment.Status':1,'Payment.Method':0},{'Payment.Status':1,'Payment.Method':1},{'Payment.Status':0,'Payment.Method':1}] }).populate('Products.ProductID');
};

//TODO: change the data type
const updateOrderStatus =async (id:string,status:number)=>{
 return await OrderModel.updateOne({_id:id},{OrderStatus:status});
}

const getOrderStatus = async (id:string)=>{
  let order =  await OrderModel.findOne({_id:id});
  return order?.OrderStatus;
}


const cancelOrder = async (id:string)=>{


  let order = await OrderModel.findOne({_id:id});
  let updateArr = order?.Products.map((p, i) => {

    return {
      updateOne: {
        filter: { "_id": p.ProductID },
        update: { $inc: { "availableInventory": + p.Count } },
      },
    };
  });

  ProductService.updateBulk(updateArr);

  return await OrderModel.updateOne({_id:id},{OrderStatus:4});
  
}

//add data as post
const createOrderCash = async (data:IOrderData)=>{

    return await CashService.createOrder(data);
}

const createOrderPaypal = async (data:IOrderData)=>{
    return await paypal.createOrder(data,false);
}

//order id 
const captureOrder = async(data:any)=>{
    await paypal.captureOrder(data,false);
}

export default {cancelOrder, updateOrderStatus,  getAll, getAllUserID,createOrderCash,createOrderPaypal,captureOrder,getOrderStatus };
