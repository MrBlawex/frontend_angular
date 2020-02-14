import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
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
import { TransactionService } from "src/app/services/transaction.service";
import { TransactionPost } from "src/app/models/transactionPost";
import { TransactionAddComponent } from "../transaction-add/transaction-add.component";
import { TransactionTableComponent } from "../transaction-table/transaction-table.component";
import { TransactionListModel } from "src/app/models/transactionList";

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
  private lazyLoadingSettings: any;
  private totalElemetQuantity: number;
  private switchSortByName: boolean;
  private switchSortByPrice: boolean;
  private switchSortByQuantity: boolean;

  public displayedColumns: string[] = ["name", "price", "quantity"];
  public productsArr = new MatTableDataSource<ProductModel>();
  public extandDetail: ProductModel;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    // tslint:disable-next-line:variable-name
    private _productService: ProductService,
    public dialog: MatDialog,
    public transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.productsArr.paginator = this.paginator;
    this.lazyLoadingSettings = { page: 0, perPage: 10, sortBy: 2 };

    this._productService
      .lazyUpdate(this.lazyLoadingSettings)
      .subscribe(data => {
        this.productsArr.data = data.products;
        this.totalElemetQuantity = data.totalCount;
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
      if (result !== false) {
        this._productService
          .addProduct(result)
          .subscribe(() => this._productService.updateProducts().subscribe());
      }
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
      if (result != null) {
        this._productService
          .editProduct(result)
          .subscribe(() => this._productService.updateProducts().subscribe());
      }
    });
  }

  public refreshProductsList() {
    this._productService.updateProducts().subscribe();
  }

  public addTransaction(product: ProductModel) {
    const dialogRef = this.dialog.open(TransactionAddComponent);
    dialogRef.afterClosed().subscribe((data: TransactionPost) => {
      if (data !== null) {
        this.transactionService.addTransaction(product, data).subscribe();
      }
    });
  }

  public createTransactionList(product: ProductModel) {
    this.transactionService.getTransactionList(product).subscribe(value => {
      console.log(value);
      this.dialog.open(TransactionTableComponent, {
        data: value
      });
    });
  }

  public getNextPage(event: PageEvent): void {
    // tslint:disable-next-line:max-line-length
    this.lazyLoadingSettings.perPage =
      this.totalElemetQuantity - this.productsArr.data.length > 5
        ? 5
        : this.totalElemetQuantity - this.productsArr.data.length;
    if (
      !this.productsArr.paginator.hasNextPage() &&
      this.totalElemetQuantity >= this.productsArr.data.length
    ) {
      this._productService
        .lazyUpdate(this.lazyLoadingSettings)
        .subscribe(data => {
          const intermediateDataSource = this.productsArr.data;
          intermediateDataSource.push(...data.products);
          this.productsArr.data = intermediateDataSource;
        });
    }
  }

  public sortBy(property: string) {
    switch (property) {
      case "name": {
        if (this.switchSortByName === true) {
          this.lazyLoadingSettings.sortBy = 0;
        } else {
          this.lazyLoadingSettings.sortBy = 1;
        }
        this.lazyLoadingSettings.perPage = this.productsArr.data.length;
        this.switchSortByName = !this.switchSortByName;
        break;
      }
      case "price": {
        if (this.switchSortByPrice === true) {
          this.lazyLoadingSettings.sortBy = 2;
        } else {
          this.lazyLoadingSettings.sortBy = 3;
        }
        this.lazyLoadingSettings.perPage = this.productsArr.data.length;
        this.switchSortByPrice = !this.switchSortByPrice;
        break;
      }
      case "quantity": {
        if (this.switchSortByQuantity === true) {
          this.lazyLoadingSettings.sortBy = 4;
        } else {
          this.lazyLoadingSettings.sortBy = 5;
        }
        this.lazyLoadingSettings.perPage = this.productsArr.data.length;
        this.switchSortByQuantity = !this.switchSortByQuantity;
        break;
      }
    }
    this.lazyLoadingSettings.page = 0;
    console.log("current length = ", this.productsArr.paginator.length);
    console.log("lazy Settings: ", this.lazyLoadingSettings);
    this._productService
      .lazyUpdate(this.lazyLoadingSettings)
      .subscribe(data => {
        console.log("lazy data: ", data);
        this.productsArr.data = data.products;
      });
  }
}
