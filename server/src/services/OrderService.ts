import OrderModel from "../model/OrderModel";
import { IOrder } from "../model/OrderModel";
import paypal from '../services/PaypalService'
import CashService from "./CashService";
import { IOrderData } from "./Order Interfaces/IOrderData";



//modify price
const insertOrder = (data: IOrder) => {


var order = new OrderModel(data);
order.save();
};

//with user
const getOne = (OrderID: string) => {
  return OrderModel.find({ _id: OrderID });
};

const getAll = () => {
  return OrderModel.find({}).populate('Products.ProductID');
};

const getAllUserID = async (UserID: string) => {
  return await OrderModel.find({ UserID: UserID });
};


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

export default { insertOrder, getOne, getAll, getAllUserID,createOrderCash,createOrderPaypal,captureOrder };
