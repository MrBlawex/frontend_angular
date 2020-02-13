import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TransactionPost } from 'src/app/models/transactionPost';


@Component({
    selector: 'app-transaction-add',
    templateUrl: './transaction-add.component.html',
    styleUrls: ['./transaction-add.component.scss']
})
export class TransactionAddComponent {

    public transactionAddForm: FormGroup;
    public operationType: number;

    constructor(
        public formBuilder: FormBuilder,
        private transactionService: TransactionService,
        public dialogRef: MatDialogRef<TransactionAddComponent>,
        @Inject(MAT_DIALOG_DATA) public data: TransactionPost) {
        this.transactionAddForm = formBuilder.group({
            quantity: [null, [Validators.required, Validators.max(10000)]],
            operation: [0, Validators.required],
        });
    }

    public close(data: TransactionService | null) {
        this.dialogRef.close(data);
    }

}
