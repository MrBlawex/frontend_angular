import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthComponent } from "./components/auth/auth.component";
import { ProductsTableComponent } from "./components/products-table/products-table.component";
import { RegisterComponent } from "./components/register/register.component";
import { UsersService } from "./user.service";

import { ProductService } from "./services/product.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";

import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { HeaderComponent } from "./components/header/header.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "./components/confirm-dialog/confirm-dialog.component";
import { AuthInterceptor } from "./components/auth/auth.interceptor";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ProductAddDialogComponent } from "./components/product-add-dialog/product-add-dialog.component";
import { ProductEditDialogComponent } from "./components/product-edit-dialog/product-edit-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProductsTableComponent,
    RegisterComponent,
    HeaderComponent,
    ConfirmDialogComponent,
    ProductAddDialogComponent,
    ProductEditDialogComponent
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
    MatBottomSheetModule,
    MatSortModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [
    UsersService,
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ProductEditDialogComponent,
    ProductAddDialogComponent,
    ConfirmDialogComponent
  ]
})
export class AppModule {}
