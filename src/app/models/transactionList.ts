import { ProductModel } from './Product';

export interface TransactionListModel {
    type: number;
    amount: number;
    date: Date;
    product: ProductModel;
    user: string;
}
