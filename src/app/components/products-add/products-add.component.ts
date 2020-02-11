import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { ProductModel } from 'src/app/models/Product';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.scss'],
})
export class ProductsAddComponent implements OnInit {

  form: FormGroup;

  constructor(private _productService: ProductService) { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.form = new FormGroup({curName: new FormControl('', Validators.required), curPrice: new FormControl('', [Validators.required, Validators.min(0)])});
  }

  submit() {
    const {curName, curPrice} = this.form.controls;
    const product: ProductModel = {name: String(curName.value), price: Number(curPrice.value)};
    this._productService.addProducts(product);
    this.form.reset();
  }
}
