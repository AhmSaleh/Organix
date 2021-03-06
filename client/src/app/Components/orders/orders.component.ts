import { Component, OnInit } from '@angular/core';
import { IOrder, OrderStatus, PaymentMethod } from 'src/app/Interfaces/IOrder';
import { PaymentStatus } from 'src/app/Interfaces/IOrder';
import { AuthService } from 'src/app/Services/auth.service';
import { OrderService } from 'src/app/Services/order.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { DataTransferService } from 'src/app/Services/DataTransferService/data-transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [OrderService],
})
export class OrdersComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private auth: AuthService,
    private dialog: MatDialog,
    private param: DataTransferService,
    private router: Router
  ) {}
  orders: IOrder[] = [];
  readonly OrderStatus = OrderStatus;
  readonly PaymentStatus = PaymentStatus;
  readonly PaymentMethod = PaymentMethod;
  readonly role = this.auth.getRole();

  ngOnInit(): void {
    if (this.param.getData() != '') {
      this.orderService.getOrders(this.param.getData()).subscribe((res) => {
        this.orders = res;
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  cancelOrder(id: string) {
    this.orderService.updateOrderStatus(id, 4);

    let i = this.orders.findIndex((o) => o._id == id);
    this.orders[i].OrderStatus = 4;
  }
  openDialog(data: IOrder) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    dialogConfig.height = 'auto';

    dialogConfig.data = data;

    const dialogRef = this.dialog.open(AdminOrderComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      let i = this.orders.findIndex((o) => o._id == data.id);
      this.orders[i].OrderStatus = data.status;
      this.orderService.updateOrderStatus(this.orders[i]._id, data.status);
      console.log('Dialog output:', data);
    });
  }
}
