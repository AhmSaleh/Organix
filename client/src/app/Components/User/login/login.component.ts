import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/UserServices/user.service';

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
    private auth: AuthService
  ) {
    this.myForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.userService.loginUser(this.myForm.value).subscribe(
        (data) => {
          this.auth.login(
            data.headers.get('x-auth-token'),
            this.myForm.value.email
          );
          this.router.navigate(['./home']);
        },
        (error) => {
          console.log(error);
        }
      );
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
