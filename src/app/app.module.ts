import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsAddComponent } from './components/products-add/products-add.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProductsListComponent,
    ProductsAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
