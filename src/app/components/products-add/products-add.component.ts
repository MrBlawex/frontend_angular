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

  // tslint:disable-next-line:variable-name
  constructor(private _productService: ProductService) { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.form = new FormGroup({Name: new FormControl('', Validators.required), Price: new FormControl('', [Validators.required, Validators.min(0)])});
  }

  submit() {
    this._productService.addProduct(this.form.value).subscribe(
      () => {
        this._productService.updateProducts().subscribe();
        this.form.reset();
      }
    );
  }
}
