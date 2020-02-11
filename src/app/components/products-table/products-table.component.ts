import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from 'src/app/models/Product';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'price', 'control'];
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
    this.createProductsList();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productsArr.filter = filterValue.trim().toLowerCase();
  }

  public removeProduct(product: ProductModel) {
    this._productService.removeProduct(product);
  }

  public editProduct(product: ProductModel) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this._productService.editProduct(product, result);
    });
  }

  public createProductsList() {
    this._productService.getProducts().subscribe(
      (data: ProductModel[]) => {
        this.productsArr.data = data;
      }
    );
  }
}
