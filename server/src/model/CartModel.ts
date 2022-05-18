import mongoose from "mongoose";

export interface ICart extends mongoose.Document{
    UserID:string,
    Products:{ ProductID: string, Count: number }[]
}

const CartSchema = new mongoose.Schema<ICart>({
    UserID:{
        type:String,
    },
    Products:{
        type:[{ ProductID: String, Count: Number}]
    }
})

const CartModel = mongoose.model<ICart>('Cart', CartSchema);

export default CartModel;