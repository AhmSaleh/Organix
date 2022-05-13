import { IProduct } from "./IProduct";

export interface ICartView {
    Products:{product:IProduct,Count:number}[]
}