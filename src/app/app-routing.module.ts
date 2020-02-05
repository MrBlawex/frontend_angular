import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component'
import { RegisterComponent } from './components/register/register.component'
import { ProductsAddComponent } from './components/products-add/products-add.component'
import { ProductsListComponent } from './components/products-list/products-list.component'


const routes: Routes = [
  {path:'login', component: AuthComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'products/list', component: ProductsListComponent},
  {path: 'products/add', component: ProductsAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
