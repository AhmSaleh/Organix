import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../Interfaces/IOrder';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient,private auth:AuthService) { }

  getOrders(){
   return this.http.get<IOrder[]>('http://localhost:3000/api/order/orders',{
     headers:{
       'x-auth-token':this.auth.getToken()
     }
   });
  }

  updateOrderStatus(){

  }
}
