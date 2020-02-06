import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProductsListComponent } from './components/products-table/products-table.component';
import { ProductsAddComponent } from './components/products-add/products-add.component';
import { RegisterComponent } from './components/register/register.component'
import { UsersService } from './user.service';

import { ProductService } from './services/product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatTableModule } from '@angular/material/table'; 
import { MatIconModule } from '@angular/material/icon';
import { ProductsControllerComponent } from './components/products-controller/products-controller.component';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatCardModule } from '@angular/material/card';
import { ProductStatsComponent } from './components/product-stats/product-stats.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProductsListComponent,
    ProductsAddComponent,
    RegisterComponent,
    ProductsControllerComponent,
    HeaderComponent,
    ProductStatsComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatBottomSheetModule
  ],
  providers: [UsersService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
