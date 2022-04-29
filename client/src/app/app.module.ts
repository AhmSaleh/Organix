import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { NotFoundComponentComponent } from './Components/not-found/not-found-component.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductGridComponent } from './Components/shop/product-grid/product-grid.component';
import { ShopComponent } from './Components/shop/shop.component';
import { ProductItemComponent } from './Components/shop/product-item/product-item.component';
import { SidebarComponent } from './Components/shop/sidebar/sidebar.component';
import { CartComponent } from './Components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    NotFoundComponentComponent,
    HomeComponent,
    LoginComponent,
    ProductGridComponent,
    ShopComponent,
    ProductItemComponent,
    SidebarComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
