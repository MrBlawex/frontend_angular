import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionListModel } from 'src/app/models/transactionList';
import { ProductModel } from 'src/app/models/Product';

@Component({
    selector: 'app-transaction-table',
    templateUrl: './transaction-table.component.html',
    styleUrls: ['./transaction-table.component.scss'],
})
export class TransactionTableComponent implements OnInit {

    public dataSource = new MatTableDataSource<TransactionListModel>();
    public displayedColumns = ['operation', 'quantity', 'date', 'product', 'userName'];

    @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;

    constructor(
        public dialog: MatDialog,
        private transactionService: TransactionService,
        public dialogRef: MatDialogRef<TransactionTableComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            console.log(data);
        }

    ngOnInit() {
        for (const data of this.data) {
            data.operation = data.operation === 1 ? 'Coming' : 'Cunsumption';
            data.date = this.parsingDate(data.date);
            data.product = this.parsingProduct(data.product);
        }
        this.dataSource.data = this.data;
        this.dataSource.paginator = this.paginator;
    }

    private parsingDate(date: string): string {
        return date.slice(0, 10).replace(/[-]/g, '/');
    }

    private parsingProduct(product: ProductModel): string {
        return `${product.name}: ${product.price}`;
    }

    public close() {
        this.dialogRef.close();
    }
}
