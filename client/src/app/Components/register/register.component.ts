import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  validClass = ' is-valid ';
  invalidClass = ' is-invalid ';
  myRegisterForm: FormGroup;
  availableRoles: String[] = ['Customer', 'Trader'];

  constructor(private userService: UserService) {
    this.myRegisterForm = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
      }),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      role: new FormControl('', Validators.required),
    });
  }

  firstnameOpacity() {
    return this.myRegisterForm.get(`name.firstName`)?.pristine ||
      this.myRegisterForm.get(`name.firstName`)?.invalid
      ? 'opacity-50'
      : '';
  }

  lastnameOpacity() {
    return this.myRegisterForm.get(`name.lastName`)?.pristine ||
      this.myRegisterForm.get(`name.lastName`)?.invalid
      ? 'opacity-50'
      : '';
  }

  emailOpacity() {
    return this.myRegisterForm.controls['email'].pristine ||
      this.myRegisterForm.controls['email'].invalid
      ? 'opacity-50'
      : '';
  }

  passwordOpacity() {
    return this.myRegisterForm.controls['password'].pristine ||
      this.myRegisterForm.controls['password'].invalid
      ? 'opacity-50'
      : '';
  }

  roleOpacity() {
    return this.myRegisterForm.controls['role'].pristine ||
      this.myRegisterForm.controls['role'].invalid
      ? 'opacity-50'
      : '';
  }

  emailErrors(): String {
    if (!this.myRegisterForm.controls['email'].errors) return '';
    return Object.keys(
      this.myRegisterForm.controls['email'].errors
    )[0].toString();
  }

  passwordErrors(): String {
    if (!this.myRegisterForm.controls['password'].errors) return '';
    return Object.keys(
      this.myRegisterForm.controls['password'].errors
    )[0].toString();
  }

  onSubmit(): void {
    if (this.myRegisterForm.valid) {
      console.log('submitting...');
      //TODO add submit logic
      this.userService.addUser(this.myRegisterForm.value).subscribe(
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
    this.myRegisterForm.reset();
  }

  emailClass(): String {
    if (this.myRegisterForm.controls['email'].untouched) return '';
    return this.myRegisterForm.controls['email'].valid
      ? this.validClass
      : this.invalidClass;
  }

  passwordClass(): String {
    if (this.myRegisterForm.controls['password'].untouched) return '';
    return this.myRegisterForm.controls['password'].valid
      ? this.validClass
      : this.invalidClass;
  }

  firstNameClass(): String {
    if (this.myRegisterForm.get(`name.firstName`)!.untouched) return '';
    return this.myRegisterForm.get(`name.firstName`)!.valid
      ? this.validClass
      : this.invalidClass;
  }

  lastNameClass(): String {
    if (this.myRegisterForm.get(`name.lastName`)!.untouched) return '';
    return this.myRegisterForm.get(`name.lastName`)!.valid
      ? this.validClass
      : this.invalidClass;
  }
  roleClass(): String {
    if (this.myRegisterForm.controls['role'].untouched) return '';
    return this.myRegisterForm.controls['role'].valid
      ? ' is-valid '
      : this.invalidClass;
  }

  ngOnInit(): void {}
}
