import { Component, OnInit, ViewChild} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/models/IProduct';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'price', 'control'];
  public productsArr = new MatTableDataSource<IProduct>(this._productService.products);
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this.productsArr.paginator = this.paginator;
    this.productsArr.sort = this.sort;
    this.productsArr.filterPredicate = (prod: IProduct, filter: string) => !filter || prod.name.startsWith(filter);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productsArr.filter = filterValue.trim().toLowerCase();
  }

}
