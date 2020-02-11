import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IProduct } from "src/app/models/IProduct";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from "src/app/models/ConfirmDialog";

@Component({
  selector: "app-product-dialog",
  templateUrl: "./product-dialog.component.html",
  styleUrls: ["./product-dialog.component.scss"]
})
export class ProductDialogComponent implements OnInit {
  form: FormGroup;
  constructor(
    public productDialog: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      curName: new FormControl("", Validators.required),
      curPrice: new FormControl("", [Validators.required, Validators.min(0)])
    });
  }

  onEdit(): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Edit", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.productDialog.close();
      }
    });
  }

  onCancel(): void {
    this.productDialog.close();
  }
}
