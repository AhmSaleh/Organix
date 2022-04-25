import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { NotFoundComponentComponent } from './Components/not-found/not-found-component.component';
import { RegisterComponent } from './Components/register/register.component';
import { ProductGridComponent } from './Components/shop/product-grid/product-grid.component';
import { ShopComponent } from './Components/shop/shop.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' }, //Default path
      { path: 'home', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'shop', component: ShopComponent}
    ],
  },
  { path: '**', component: NotFoundComponentComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
