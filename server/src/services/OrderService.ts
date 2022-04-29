import OrderModel from "../model/OrderModel";
import {IOrder} from "../model/OrderModel";


//modify price
const addOrder = (data:IOrder)=>{
var order = new OrderModel(data);
order.save();
}
//with user
const getOne = (OrderID:string)=>{
    return OrderModel.find({"_id":OrderID});
}

const getAll =  ()=>{
    return OrderModel.find({});
}

const getAllUserID = async (UserID:string)=>{
    return await OrderModel.find({"UserID":UserID});
}



export default {addOrder,getOne,getAll,getAllUserID}