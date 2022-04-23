import mongoose from "mongoose";

export interface IOrder extends mongoose.Document{
    UserID:string,
    Date:Date,
    Products:{ ProductID: string, Count: number,Price:number }[]
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
        type:[{ ProductID: String, Count: Number ,Price:Number}]
    }
})

const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);

export default OrderModel;


