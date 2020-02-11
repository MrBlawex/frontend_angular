import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { IProduct } from "src/app/models/IProduct";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { ProductDialogComponent } from "../product-dialog/product-dialog.component";
import { ConfirmDialogModel } from "src/app/models/ConfirmDialog";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-products-table",
  templateUrl: "./products-table.component.html",
  styleUrls: ["./products-table.component.scss"]
})
export class ProductsTableComponent implements OnInit {
  public displayedColumns: string[] = ["name", "price", "control"];
  public productsArr = new MatTableDataSource<IProduct>(
    this._productService.products
  );

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.productsArr.paginator = this.paginator;
    this.productsArr.sort = this.sort;
    this.productsArr.filterPredicate = (prod: IProduct, filter: string) =>
      !filter || prod.name.startsWith(filter);
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productsArr.filter = filterValue.trim().toLowerCase();
  }

  public removeProduct(product: IProduct) {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Edit", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this._productService.removeProduct(product);
      }
    });
  }

  public editProduct(product: IProduct) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: "500px",
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this._productService.editProduct(product, result);
    });
  }
}
