import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from 'src/app/models/Product';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel } from 'src/app/models/ConfirmDialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'price', 'quantity', 'control'];
  public productsArr = new MatTableDataSource<ProductModel>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.productsArr.paginator = this.paginator;
    this.productsArr.sort = this.sort;
    this.productsArr.filterPredicate = (prod: ProductModel, filter: string) => !filter || prod.name.startsWith(filter);

    this.refreshProductsList();
    this._productService.products$.subscribe(
      data => {
        this.productsArr.data = data;
      }
    );
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productsArr.filter = filterValue.trim().toLowerCase();
  }

  public removeProduct(product: ProductModel) {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel('Confirm Edit', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this._productService.removeProduct(product).subscribe(
          () => this._productService.updateProducts().subscribe()
        );
      }
    });
  }

  public editProduct(product: ProductModel) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '500px',
      data: {id: product.id, name: product.name, price: product.price, quantity: product.quantity}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this._productService.editProduct(result).subscribe(
        () => this._productService.updateProducts().subscribe()
      );
    });
  }

  public refreshProductsList() {
    this._productService.updateProducts().subscribe();
  }
}
