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
        return {Products:[]} as ICartView
    }
    
    //get products 
    var products = await ProductService.getProductList(productsIdList);

    //map with count
    var productArray = products.map((product,index) =>
    {
        return {product:product,Count: cart?.Products[index].Count} //as ICartView
    })

    return {Products:productArray} as ICartView

    //return productArray;
}


const UpdateCart = async(cart:ICart)=>{
    CartModel.findOneAndReplace({"UserID":cart.UserID},{UserID:cart.UserID,Products:cart.Products} as ICart,null,(err,doc)=>{
        //console.log(err);
        //console.log(doc);
    });
}

//add to registeration
const addCart = async (UserID:string)=>{
    let arr:{ ProductID: String, Count: Number}[] = []
    var cart = new CartModel({ UserID, Products:arr } as ICart);
    cart.save();
}

export default {getCart,UpdateCart,addCart}