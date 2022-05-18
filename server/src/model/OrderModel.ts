import types from "mongoose";
import mongoose from "mongoose";

export interface IOrder extends mongoose.Document{
    UserID:string,
    Date:Date,
    Products:{ ProductID: types.ObjectId, Count: number,Price:number }[],
    Address:string,
    OrderStatus:OrderStatus,
    Payment:{Status:PaymentStatus,Method:PaymentMethod},
    Gross:Number
}

export enum OrderStatus {
    Pending = 0,
    Accepted = 1,
    Shipped = 2,
    Delivered = 3,
    Canceled = 4
}

export enum PaymentStatus{
    Pending = 0,
    Paid = 1
}

export enum PaymentMethod {
      PayPal = 0,
      Cash = 1
}

const OrderSchema = new mongoose.Schema<IOrder>({
    UserID:{
        type:String,
    },
    Date:{
        type:Date,
        default:Date.now
    },
    Products:{
        type:[{ ProductID: {type:types.Types.ObjectId,ref:'Product'}, Count: Number ,Price:Number}],
        
    },
    Address:{type:String},
    OrderStatus:{type:Number,enum:[0,1,2,3,4]},
    Payment:{Status:{type:Number,enum:[0,1]},Method:{type:Number,enum:[0,1]}},
    Gross:{type:Number}
})

const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);

export default OrderModel;


