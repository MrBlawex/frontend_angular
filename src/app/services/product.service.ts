import { Injectable } from '@angular/core';
import { ProductModel } from '../models/Product';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public products: ProductModel[] = [];
  private readonly baseUrl = 'https://localhost:5001';


  constructor(private http: HttpClient) {
  }

  public getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`https://localhost:5001/api/Product`);
  }

  public addProducts(product: ProductModel) {
    this.products.push(product);
  }

  public removeProduct(product: ProductModel) {
    this.products = this.products.filter((prod: ProductModel) => prod.name !== product.name && prod.price !== product.price);
  }

  public editProduct(productOld: ProductModel, productNew: ProductModel) {
  }
}
