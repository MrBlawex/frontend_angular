import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public products: IProduct[] = [];

  constructor() { }
  
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
