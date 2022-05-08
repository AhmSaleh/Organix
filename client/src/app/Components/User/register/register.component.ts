import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/Services/UserServices/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  validClass = ' is-valid ';
  invalidClass = ' is-invalid ';
  myRegisterForm: FormGroup;
  availableRoles: String[] = ['User', 'Merchant'];
  imageFile: any;
  formdata: FormData = new FormData();

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
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(010|012|015|011)\d{8}$/),
      ]),
      address: new FormControl('', Validators.required),
      img: new FormControl(null, Validators.required),
    });
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = <File>event.target.files[0];
    }
  }

  imgOpacity() {
    return this.myRegisterForm.controls['img'].pristine ||
      this.myRegisterForm.controls['img'].invalid
      ? 'opacity-75'
      : '';
  }

  phoneOpacity() {
    return this.myRegisterForm.controls['phone'].pristine ||
      this.myRegisterForm.controls['phone'].invalid
      ? 'opacity-75'
      : '';
  }

  addressOpacity() {
    return this.myRegisterForm.controls['address'].pristine ||
      this.myRegisterForm.controls['address'].invalid
      ? 'opacity-75'
      : '';
  }

  firstnameOpacity() {
    return this.myRegisterForm.get(`name.firstName`)?.pristine ||
      this.myRegisterForm.get(`name.firstName`)?.invalid
      ? 'opacity-75'
      : '';
  }

  lastnameOpacity() {
    return this.myRegisterForm.get(`name.lastName`)?.pristine ||
      this.myRegisterForm.get(`name.lastName`)?.invalid
      ? 'opacity-75'
      : '';
  }

  emailOpacity() {
    return this.myRegisterForm.controls['email'].pristine ||
      this.myRegisterForm.controls['email'].invalid
      ? 'opacity-75'
      : '';
  }

  passwordOpacity() {
    return this.myRegisterForm.controls['password'].pristine ||
      this.myRegisterForm.controls['password'].invalid
      ? 'opacity-75'
      : '';
  }

  roleOpacity() {
    return this.myRegisterForm.controls['role'].pristine ||
      this.myRegisterForm.controls['role'].invalid
      ? 'opacity-75'
      : '';
  }

  emailErrors(): String {
    if (!this.myRegisterForm.controls['email'].errors) return '';
    return Object.keys(
      this.myRegisterForm.controls['email'].errors
    )[0].toString();
  }

  phoneErrors(): String {
    if (!this.myRegisterForm.controls['phone'].errors) return '';
    return Object.keys(
      this.myRegisterForm.controls['phone'].errors
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
      this.formdata.append('img', this.imageFile);
      for (let key in this.myRegisterForm.value) {
        if(key != 'img')
          this.formdata.append(key, this.myRegisterForm.value[key]);
      }

      // this.userService.addUser(this.formdata.)
      // console.log('submitting...');
      // console.log(this.formdata);
      // console.log(Object.keys(this.myRegisterForm.value));
      // console.log(this.myRegisterForm.value);

      //TODO add submit logic
      // this.userService.addUser(this.myRegisterForm.value).subscribe(
      //   (data) => {
      //     console.log(data);
      //   },
      //   (error) => {
      //     console.log(error);
      //   }
      // );
    }
  }

  onReset() {
    this.myRegisterForm.reset();
  }

  imgClass(): String {
    if (this.myRegisterForm.controls['img'].untouched) return '';
    return this.myRegisterForm.controls['img'].valid
      ? this.validClass
      : this.invalidClass;
  }

  phoneClass(): String {
    if (this.myRegisterForm.controls['phone'].untouched) return '';
    return this.myRegisterForm.controls['phone'].valid
      ? this.validClass
      : this.invalidClass;
  }

  addressClass(): String {
    if (this.myRegisterForm.controls['address'].untouched) return '';
    return this.myRegisterForm.controls['address'].valid
      ? this.validClass
      : this.invalidClass;
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
