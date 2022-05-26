import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder, OrderStatus } from '../Interfaces/IOrder';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient,private auth:AuthService) { }

  getOrders(id:string){
   return this.http.get<IOrder[]>(`http://localhost:3000/api/order/orders/${id}`,{
     headers:{
       'x-auth-token':this.auth.getToken()
     }
   });
  }

  updateOrderStatus(orderID:string,OrderStatus:OrderStatus){
    this.http.patch('http://localhost:3000/api/order/updateorder',{orderID,OrderStatus},{
      headers:{
        'x-auth-token':this.auth.getToken()
      }
    }).subscribe((res)=>{
      console.log(res);
    },(err)=>{console.log(err)})
  }
}
