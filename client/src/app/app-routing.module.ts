import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CartComponent } from './Components/cart/cart.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/User/login/login.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { NotFoundComponentComponent } from './Components/not-found/not-found-component.component';
import { RegisterComponent } from './Components/User/register/register.component';
import { ProductGridComponent } from './Components/shop/product-grid/product-grid.component';
import { ShopComponent } from './Components/shop/shop.component';
import { UserDetailsComponent } from './Components/User/user-details/user-details.component';
import { ProductDetailsComponent } from './Components/shop/product-details/product-details.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AddProductComponent } from './Components/Trader/add-product/add-product.component';
import { AboutComponent } from './Components/about/about.component';
import { UsersListComponent } from './Components/User/users-list/users-list.component';
import { EditProductComponent } from './Components/Trader/edit-product/edit-product.component';
import { DeleteProductComponent } from './Components/Trader/delete-product/delete-product.component';
import { MyproductsComponent } from './Components/Trader/myproducts/myproducts.component';
import { ViewProductDetailsComponent } from './Components/Trader/view-product-details/view-product-details.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { CartComponent } from './Components/cart/cart.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { TestComponent } from './Components/test/test.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'user/details', component: UserDetailsComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
      { path: 'add-product', component: AddProductComponent }, //5ara
      { path: 'about-us', component: AboutComponent },
      { path: 'users-list', component: UsersListComponent },
      { path: 'edit-product', component: EditProductComponent }, //5ara
      { path: 'delete-product/:id', component: DeleteProductComponent },
      { path: 'myproducts', component: MyproductsComponent },
      { path: 'view-product', component: ViewProductDetailsComponent },  //??????????????
      // { path: 'cart', component: CartComponent }
      { path: 'cart', component: CartComponent },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuard],
      },
      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
      { path: 'test', component: TestComponent}
    ],
  },
  { path: '**', component: NotFoundComponentComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
