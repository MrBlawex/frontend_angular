import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { ProductAddDialogComponent } from "../product-add-dialog/product-add-dialog.component";
import { ProductEditDialogComponent } from "../product-edit-dialog/product-edit-dialog.component";
import { ProductModel } from "src/app/models/Product";
import { ProductService } from "src/app/services/product.service";
import { ConfirmDialogModel } from "src/app/models/ConfirmDialog";

@Component({
  selector: "app-products-table",
  templateUrl: "./products-table.component.html",
  styleUrls: ["./products-table.component.scss"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class ProductsTableComponent implements OnInit {
  public displayedColumns: string[] = ["name", "price", "quantity"];
  public productsArr = new MatTableDataSource<ProductModel>();
  public extandDetail: ProductModel;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.productsArr.paginator = this.paginator;
    this.productsArr.sort = this.sort;
    this.productsArr.filterPredicate = (prod: ProductModel, filter: string) =>
      !filter || prod.name.startsWith(filter);

    this.refreshProductsList();
    this._productService.products$.subscribe(data => {
      this.productsArr.data = data;
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productsArr.filter = filterValue.trim();
  }

  public removeProduct(product: ProductModel) {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Edit", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this._productService
          .removeProduct(product)
          .subscribe(() => this._productService.updateProducts().subscribe());
      }
    });
  }

  public addProduct() {
    const dialogRef = this.dialog.open(ProductAddDialogComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      this._productService
        .addProduct(result)
        .subscribe(() => this._productService.updateProducts().subscribe());
    });
  }

  public editProduct(product: ProductModel) {
    const dialogRef = this.dialog.open(ProductEditDialogComponent, {
      width: "500px",
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      this._productService
        .editProduct(result)
        .subscribe(() => this._productService.updateProducts().subscribe());
    });
  }

  public refreshProductsList() {
    this._productService.updateProducts().subscribe();
  }
}
