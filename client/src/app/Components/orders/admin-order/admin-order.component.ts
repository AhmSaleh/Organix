import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MAT_DIALOG_DATA , MatDialogRef} from '@angular/material/dialog';
import { IOrder } from 'src/app/Interfaces/IOrder';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
}) 


export class AdminOrderComponent implements OnInit {

  form: FormGroup ;
  id:string;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<AdminOrderComponent>,
      @Inject(MAT_DIALOG_DATA) data:IOrder) {
      this.id= data._id;
       this.form = this.fb.group({
        status:[data.OrderStatus.toString()]
        })
  }
  

  ngOnInit() {
  }

  save() {
      this.dialogRef.close({status:this.form.value.status,id:this.id});
  }

  close() {
      this.dialogRef.close();
  }
}