import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/UserServices/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validClass = ' is-valid ';
  invalidClass = ' is-invalid ';
  myForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private auth: AuthService,
    private activeModal: NgbActiveModal,
    private cart: CartService
  ) {
    this.myForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.userService.loginUser(this.myForm.value).subscribe({
        next: (data) => {
          this.auth.login(
            data.headers.get('x-auth-token'),
            this.myForm.value.email
          );
          let cart = this.cart.getCart();
          if (cart.Products.length > 0) {
            this.cart.syncItems(cart);
          }
          Notify.success('Login Successful', {
            timeout: 1000,
            closeButton: true,
          });
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
          this.closeModal();
        },
        error: (error) => {
          if (error.status == 401) {
            Report.failure(
              'Login Failed',
              'Invalid Email or Password',
              'try again'
            );
          } else {
            Notify.failure('Something went wrong');
          }
        },
      });
    }
  }

  onReset() {
    this.myForm.reset();
  }

  emailOpacity() {
    return this.myForm.controls['email'].pristine ||
      this.myForm.controls['email'].invalid
      ? 'opacity-50'
      : '';
  }

  passwordOpacity() {
    return this.myForm.controls['password'].pristine ||
      this.myForm.controls['password'].invalid
      ? 'opacity-50'
      : '';
  }

  emailClass(): String {
    if (this.myForm.controls['email'].untouched) return '';
    return this.myForm.controls['email'].valid
      ? this.validClass
      : this.invalidClass;
  }

  passwordClass(): String {
    if (this.myForm.controls['password'].untouched) return '';
    return this.myForm.controls['password'].valid
      ? this.validClass
      : this.invalidClass;
  }

  ngOnInit(): void {}
}
