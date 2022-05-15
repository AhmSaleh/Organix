import { Component, OnInit } from '@angular/core';
import { IOrder, OrderStatus, PaymentMethod } from 'src/app/Interfaces/IOrder';
import { PaymentStatus } from 'src/app/Interfaces/IOrder';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers:[OrderService]
})
export class OrdersComponent implements OnInit {

  constructor(private orderService:OrderService) { 

  }
  orders:IOrder[] = [];
  readonly OrderStatus = OrderStatus;
  readonly PaymentStatus = PaymentStatus;
  readonly PaymentMethod = PaymentMethod;

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((res)=>{
      this.orders = res;
      console.log(res);
    })

  }

}
