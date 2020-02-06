import { Component, OnInit, ViewChild} from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/models/IProduct';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'price', 'control'];
  public productsArr = new MatTableDataSource<IProduct>(this._productService.products);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this.productsArr.paginator = this.paginator;
  }



}
