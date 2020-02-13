import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { TransactionListModel } from '../models/transactionList';
import { ProductModel } from '../models/Product';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { TransactionPost } from '../models/transactionPost';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    public transactionData$: BehaviorSubject<TransactionListModel[]> = new BehaviorSubject([]);

    constructor(private http: HttpClient) {}

    public getTransactionList(product: ProductModel) {
        const id = product.id;
        return this.http.get<TransactionListModel[]>(`https://localhost:5001/api/ProductTransaction/${id}`).pipe(
            tap(data => this.transactionData$.next(data))
        );
    }

    public addTransaction(product: ProductModel, transaction: TransactionPost) {
        const id = product.id;
        return this.http.post(`https://localhost:5001/api/ProductTransaction/${id}`, transaction);
    }
}
