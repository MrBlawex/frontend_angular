import { ProductModel } from './Product';

export interface TransactionListModel {
    operation: number;
    quantity: number;
    date: string;
    product: ProductModel;
    userName: string;
}
