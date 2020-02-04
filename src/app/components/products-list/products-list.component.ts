import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  prod1: Product = {
    name: "car",
    price: 214321
  }
  prod2: Product = {
    name: "phone",
    price: 852
  }
  arrayOfProducts: Array<Product> = [this.prod1,this.prod2];

  constructor() { }

  ngOnInit() {
  }

}
