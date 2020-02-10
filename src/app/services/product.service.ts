import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
      this.products.push({name: 'fsafafas' + String(i), price: Number(Math.random() * 10000)});
    }
  }
  
  public addProducts(product:IProduct){
    this.products.push(product);
  }

  public removeProduct(product:IProduct){
    this.products = this.products.filter((prod:IProduct) => prod.name != product.name && prod.price != product.price);
  }

  public editProduct(productOld:IProduct, productNew: IProduct){
   
  }
}
