import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogModel } from 'src/app/models/ConfirmDialog';
import { ProductModel } from 'src/app/models/Product';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  form: FormGroup;
  constructor(
    public productDialog: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      curName: new FormControl('', Validators.required),
      curPrice: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  onEdit(): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel('Confirm Edit', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.productDialog.close();
      }
    });
  }

  onCancel(): void {
    this.productDialog.close();
  }
}
