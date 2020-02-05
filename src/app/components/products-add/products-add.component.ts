import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/models/IProduct'

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.scss'],
})
export class ProductsAddComponent implements OnInit {

  form: FormGroup

  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this.form = new FormGroup({curName: new FormControl('', Validators.required), curPrice: new FormControl('', Validators.required)})
  }

  submit(){
    const {curName, curPrice} = this.form.controls;
    const product: IProduct = {name: String(curName.value), price: Number(curPrice.value)}
    this._productService.addProducts(product)
    this.form.reset();
  }
}
