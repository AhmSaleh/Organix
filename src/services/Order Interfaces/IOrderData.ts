export interface IOrderData {
  UserID: string;
  Products: [{ ID: string; Count: number }];
  Address: string;
  Method: PaymentMethod;
}
export enum PaymentMethod {
      PayPal = 0,
      Cash = 1
}