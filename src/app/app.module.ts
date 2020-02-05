import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsAddComponent } from './components/products-add/products-add.component';
import { RegisterComponent } from './components/register/register.component'
import { UsersList } from './user.service';



import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductService } from './services/product.service';
import { Mate}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProductsListComponent,
    ProductsAddComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [UsersList, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
