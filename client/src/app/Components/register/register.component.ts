import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  validClass = ' is-valid ';
  invalidClass = ' is-invalid ';

  availableRoles: String[] = ['Customer', 'Trader'];

  firstName: FormControl = new FormControl('', Validators.required);
  lastName: FormControl = new FormControl('', Validators.required);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  role: FormControl = new FormControl('', Validators.required);

  myForm: FormGroup = new FormGroup({
    name: new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
    }),
    email: this.email,
    password: this.password,
    role: this.role,
  });

  formControlClass(controlName: String): String {
    switch (controlName) {
      case 'firstName':
        return this.firstNameClass();
      case 'lastName':
        return this.lastNameClass();
      case 'email':
        return this.emailClass();
      case 'password':
        return this.passwordClass();
      case 'role':
        return this.roleClass();
      default:
        return '';
    }
  }

  formControlOpacity(controlName: String): String {
    switch (controlName) {
      case 'firstName':
        return this.firstName.pristine ? 'opacity-50' : '';
      case 'lastName':
        return this.lastName.pristine ? 'opacity-50' : '';
      case 'email':
        return this.email.pristine ? 'opacity-50' : '';
      case 'password':
        return this.password.pristine ? 'opacity-50' : '';
      case 'role':
        return this.role.pristine ? 'opacity-50' : '';
      default:
        return '';
    }
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      console.log('submitting...');
      //to be changed later once the api is created
    }
  }

  onReset() {
    this.myForm.reset();
  }

  private emailClass(): String {
    if (this.email.untouched) return '';
    return this.email.valid ? this.validClass : this.invalidClass;
  }

  private passwordClass(): String {
    if (this.password.untouched) return '';
    return this.password.valid ? this.validClass : this.invalidClass;
  }

  private firstNameClass(): String {
    if (this.firstName.untouched) return '';
    return this.firstName.valid ? this.validClass : this.invalidClass;
  }

  private lastNameClass(): String {
    if (this.lastName.untouched) return '';
    return this.lastName.valid ? this.validClass : this.invalidClass;
  }
  private roleClass(): String {
    if (this.role.untouched) return '';
    return this.role.valid ? ' is-valid ' : this.invalidClass;
  }

  ngOnInit(): void {}
}
