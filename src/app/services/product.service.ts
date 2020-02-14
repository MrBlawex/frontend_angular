import { Injectable } from '@angular/core';
import { ProductModel } from '../models/Product';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { TestLazy } from '../models/test';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public products$: BehaviorSubject<ProductModel[]> = new BehaviorSubject([]);
  private readonly baseUrl = 'https://localhost:5001/api/Product';

  constructor(private http: HttpClient) {}

  public updateProducts() {
    return this.getProducts().pipe(
      tap(data => {
        this.products$.next(data);
      })
    );
  }

  public lazyUpdate(setting: any) {
    return this.lazyLoading(setting).pipe(
      tap(data => {
        this.products$.next(data.products);
      })
    );
  }

  public getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.baseUrl}`);
  }

  public lazyLoading(setting: any): Observable<TestLazy> {
    return this.http.post<TestLazy>(`${this.baseUrl}/lazy`, setting);
  }

  public addProduct(product: ProductModel) {
    return this.http.post(`${this.baseUrl}`, product);
  }

  public removeProduct(product: ProductModel) {
    return this.http.delete(`${this.baseUrl}/${product.id}`);
  }

  public editProduct(product: ProductModel) {
    return this.http.put(`${this.baseUrl}/${product.id}`, {
      name: product.name,
      price: product.price
    });
  }
}
