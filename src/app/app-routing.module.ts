import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/register/register.component';
// import { ProductsAddComponent } from './components/products-add/products-add.component'
// import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductsControllerComponent } from './components/products-controller/products-controller.component';
import { AuthGuard } from './components/auth/auth.guard';


const routes: Routes = [
  {path: 'login', component: AuthComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'products', canActivate: [AuthGuard], component: ProductsControllerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
