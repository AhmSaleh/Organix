import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  myForm: FormGroup;

  constructor() {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl(0, [Validators.min(0), Validators.required]),
      shortDescription: new FormControl('', [
        Validators.minLength(0),
        Validators.required,
      ]),
      imgURL: new FormControl('', Validators.required),
      weight: new FormControl(0, [Validators.required, Validators.min(0)]),
      availableInventory: new FormControl(),
      longDescription: new FormControl(),
    });
  }

  onSumbit() {}

  onReset() {
    this.myForm.reset();
  }
  /*
 name: string;
  rate: number;
  price: number;
  shortDescription: string;
  availability: boolean;
  imgURL: string;
  weight: number;
  availableInventory: number;
  longDescription: string;
  productInformation: string;
  */

  ngOnInit(): void {}
}
