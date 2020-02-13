import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Component, OnInit, Inject } from "@angular/core";
import { ConfirmDialogModel } from "src/app/models/ConfirmDialog";

@Component({
  selector: "app-product-add-dialog",
  templateUrl: "./product-add-dialog.component.html",
  styleUrls: ["./product-add-dialog.component.scss"]
})
export class ProductAddDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      Name: new FormControl("", Validators.required),
      Price: new FormControl("", [Validators.required, Validators.min(0)])
    });
  }

  submit() {
    this.dialogRef.close(false);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
