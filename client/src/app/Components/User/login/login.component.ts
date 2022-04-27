import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/Services/UserServices/RegisterService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validClass = ' is-valid ';
  invalidClass = ' is-invalid ';

  myForm: FormGroup;

  constructor(private userService: UserService) {
    this.myForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('submitting...');
      //TODO add login logic
      //to be changed later once the api is created
      this.userService.loginUser(this.myForm.value).subscribe(
        (data) => {
          console.log(data);
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
