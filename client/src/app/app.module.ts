import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/User/register/register.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { NotFoundComponentComponent } from './Components/not-found/not-found-component.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/User/login/login.component';
import { ProductGridComponent } from './Components/shop/product-grid/product-grid.component';
import { ShopComponent } from './Components/shop/shop.component';
import { ProductItemComponent } from './Components/shop/product-item/product-item.component';
import { SidebarComponent } from './Components/shop/sidebar/sidebar.component';
import { CartComponent } from './Components/cart/cart.component';
import { UserDetailsComponent } from './Components/User/user-details/user-details.component';
import { ProductDetailsComponent } from './Components/shop/product-details/product-details.component';
import { ReviewsComponent } from './Components/shop/productDetails/reviews/reviews.component';
import { ReviewsItemComponent } from './Components/shop/productDetails/reviews-item/reviews-item.component';
import { RatingStarsComponent } from './Components/shop/productDetails/rating-stars/rating-stars.component';
import { CartService } from './Services/cart.service';
import { AuthService } from './Services/auth.service';
import { CategoriesComponent } from './Components/shop/categories/categories.component';
import { AddProductComponent } from './Components/Trader/add-product/add-product.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HeroComponent } from './Components/home/hero/hero.component';
import { SearchComponent } from './Components/home/hero/search/search.component';
import { AboutComponent } from './Components/about/about.component';
import { UsersListComponent } from './Components/User/users-list/users-list.component';
import { UsersListFilterPipe } from './Pipes/users-list/users-list-filter.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from './Components/shop/pagination/pagination.component';
import { MyproductsComponent } from './Components/Trader/myproducts/myproducts.component';
import { EditProductComponent } from './Components/Trader/edit-product/edit-product.component';
import { ViewProductDetailsComponent } from './Components/Trader/view-product-details/view-product-details.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { AdminOrderComponent } from './Components/orders/admin-order/admin-order.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CategoriesCarouselComponent } from './Components/home/categories-carousel/categories-carousel.component';
import { FeaturedProductsComponent } from './Components/home/featured-products/featured-products.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TestComponent } from './Components/test/test.component';
import { ListCategoriesComponent } from './Components/Category/list-categories/list-categories.component';
import { EditCategoryComponent } from './Components/Category/edit-category/edit-category.component';
import { AddCategoryComponent } from './Components/Category/add-category/add-category.component';
import { ViewCategoryComponent } from './Components/Category/view-category/view-category.component';
import { UpdateProductStatusComponent } from './Components/update-product-status/update-product-status.component';
import { ChangeRoleComponent } from './Components/change-role/change-role.component';
import { ManageAllProductsComponent } from './Components/Admin/manage-all-products/manage-all-products.component';
import { ProductListFilterPipe } from './Pipes/product-list-filter.pipe';
// import {MatRadioModule} from '@angular/material/radio'
// import {MatFormFieldModule} from '@angular/material/form-field'

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
    UserDetailsComponent,
    ProductDetailsComponent,
    ReviewsComponent,
    ReviewsItemComponent,
    RatingStarsComponent,
    CategoriesComponent,
    AddProductComponent,
    HeroComponent,
    SearchComponent,
    AboutComponent,
    UsersListComponent,
    UsersListFilterPipe,
    PaginationComponent,
    MyproductsComponent,
    EditProductComponent,
    ViewProductDetailsComponent,
    CheckoutComponent,
    OrdersComponent,
    AdminOrderComponent,
    CategoriesCarouselComponent,
    FeaturedProductsComponent,
    TestComponent,
    ListCategoriesComponent,
    EditCategoryComponent,
    AddCategoryComponent,
    ViewCategoryComponent,
    UpdateProductStatusComponent,
    ChangeRoleComponent,
    ManageAllProductsComponent,
    ProductListFilterPipe,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CarouselModule,
    NgbModule,
    FormsModule,
    MatDialogModule,
    MatSidenavModule,
    // MatRadioModule,
    // MatFormFieldModule
  ],
  providers: [CartService, HttpClient, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [AdminOrderComponent],
})
export class AppModule {}
