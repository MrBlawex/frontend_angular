import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public products: IProduct[] = [];

  constructor() {
    this._init();
  }

  private _init(){
    for (let i = 0; i < 500; i++){
      this.products.push({name: 'fsafafas', price: i});
    }
  }
  
  public addProducts(prod:IProduct){
      this.products.push(prod);
  }

  public removeProduct(prod:IProduct){
      //this.products = this.products.map((prod:IProduct) => );
  }

  public editProduct(){
   // this.products.
  }
}
