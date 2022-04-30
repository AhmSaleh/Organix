import CartModel from "../model/CartModel";
import {ICart} from "../model/CartModel";
import { IProduct } from "../model/Product.Model";


import ProductService from "./ProductService";


export interface ICartView{
    Products?:{product:IProduct,Count:number}[]
}

//get ICartview
const getCart = async (UserID:string)=>{
    //find user cart
    var cart = await CartModel.findOne({"UserID":UserID});

    //get products id list from carts
    let productsIdList:string[] = cart?.Products?.map(p=> p.ProductID) ?? [];

    if(productsIdList.length == 0){
        return {} as ICartView
    }
    
    //get products 
    var products = await ProductService.getProductList(productsIdList);

    //map with count
    var cartView = products.map((product,index) =>
    {
        return {product:product,Count: cart?.Products[index].Count} as ICartView
    })

    return cartView;
}


const UpdateCart = async(cart:ICart)=>{
    CartModel.findOneAndReplace({"UserID":cart.UserID},{UserID:cart.UserID,Products:cart.Products} as ICart);
}

//add to registeration
const addCart = async (UserID:string)=>{
    var cart = new CartModel({ UserID } as ICart);
    cart.save();
}

export default {getCart,UpdateCart,addCart}