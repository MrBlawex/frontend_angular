import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/models/IProduct';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

public productsArr: IProduct[] = this._productService.products;

  constructor(private _productService: ProductService) { }

  ngOnInit() {
  }

}
