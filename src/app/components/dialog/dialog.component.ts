import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel } from 'src/app/models/Product';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel
  ) {}

  ngOnInit() {
    this.form = new FormGroup({curName: new FormControl('', Validators.required), curPrice: new FormControl('', [Validators.required, Validators.min(0)])});
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
