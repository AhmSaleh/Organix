import { IProduct } from "./IProduct";

export interface IOrderData {
  UserID: string;
  Products: [{ ID: string; Count: number }, { ID: string; Count: number }];
  Address: string;
  Method: PaymentMethod;
}

export interface IOrder {
  _id:string
  UserID:string,
  Date:Date,
  Products:{ ProductID: IProduct, Count: number,Price:number }[],
  Address:string,
  OrderStatus:OrderStatus,
  Payment:{Status:PaymentStatus,Method:PaymentMethod},
  Gross:Number
}




export enum PaymentMethod {
  PayPal = 0,
  Cash = 1,
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