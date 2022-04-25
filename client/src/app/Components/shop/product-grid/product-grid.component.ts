import { Component, OnInit } from '@angular/core';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}


@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public products :IProduct[]= Array(10).fill(1).map((x, i) => ({
    id: i+1,
    name: `Product ${i+1}`,
    price: Math.floor(Math.random() * 1000),
    imageUrl: `https://picsum.photos/seed/${i+1}/200/300`
  }));
}
