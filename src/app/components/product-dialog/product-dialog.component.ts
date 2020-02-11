import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IProduct } from "src/app/models/IProduct";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-product-dialog",
  templateUrl: "./product-dialog.component.html",
  styleUrls: ["./product-dialog.component.scss"]
})
export class ProductDialogComponent implements OnInit {
  form: FormGroup;
  constructor(
    public productDialog: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      curName: new FormControl("", Validators.required),
      curPrice: new FormControl("", [Validators.required, Validators.min(0)])
    });
  }

  onCancel(): void {
    this.productDialog.close();
  }
}
