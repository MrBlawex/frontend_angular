import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsAddComponent } from './components/products-add/products-add.component';
import { RegisterComponent } from './components/register/register.component'



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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
