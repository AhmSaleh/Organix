import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICartView } from 'src/app/Interfaces/ICartView';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
declare var $: any;
import { TestComponent } from '../test/test.component';
import { LoginComponent } from '../User/login/login.component';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  constructor(
    public cartService: CartService, 
    public auth: AuthService, 
    private modalService: NgbModal,
    private router: Router
    ) {
  }

  openLoginModal() {
    const modalRef = this.modalService.open(LoginComponent, {
      backdropClass: "modal",
      windowClass: "bg-dark"
    });
  }

  ngOnInit() {
    $(".humberger__open").on('click', function () {
      $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
      $(".humberger__menu__overlay").addClass("active");
      $("body").addClass("over_hid");
    });

    $(".humberger__menu__overlay").on('click', function () {
      $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
      $(".humberger__menu__overlay").removeClass("active");
      $("body").removeClass("over_hid");
    });

    $(".mobile-menu").slicknav({
      prependTo: '#mobile-menu-wrap',
      allowParentLinks: true
    });
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}
