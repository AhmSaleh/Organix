import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';
declare var $: any;
import { LoginComponent } from '../User/login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTransferService } from 'src/app/Services/DataTransferService/data-transfer.service';
import { UserService } from 'src/app/Services/UserServices/user.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  img: any;
  email: any;

  constructor(
    public cartService: CartService,
    public authService: AuthService,
    private modalService: NgbModal,
    public router: Router,
    private dataTransferService: DataTransferService,
    private userService: UserService
  ) {}

  openLoginModal() {
    const modalRef = this.modalService.open(LoginComponent, {
      backdropClass: 'modal',
      windowClass: 'bg-dark',
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.img = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  gotoOrders() {
    this.dataTransferService.clearData();
    this.dataTransferService.setData(this.authService.getUserId());
    this.router.navigate(['orders']);
  }

  ngOnInit() {
    $('.humberger__open').on('click', function () {
      $('.humberger__menu__wrapper').addClass('show__humberger__menu__wrapper');
      $('.humberger__menu__overlay').addClass('active');
      $('body').addClass('over_hid');
    });

    $('.humberger__menu__overlay').on('click', function () {
      $('.humberger__menu__wrapper').removeClass(
        'show__humberger__menu__wrapper'
      );
      $('.humberger__menu__overlay').removeClass('active');
      $('body').removeClass('over_hid');
    });

    $('.mobile-menu').slicknav({
      prependTo: '#mobile-menu-wrap',
      allowParentLinks: true,
    });

    this.userService.getUserPFP().subscribe(data => {
      this.createImageFromBlob(data);
    });
    this.email = this.authService.getEmail();
  }


  logout() {
    this.email = '';
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
