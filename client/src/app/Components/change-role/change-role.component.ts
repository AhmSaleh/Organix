import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { IUser } from 'src/app/Models/IUser';
import { AuthService } from 'src/app/Services/auth.service';
import { DataTransferService } from 'src/app/Services/DataTransferService/data-transfer.service';
import { UserService } from 'src/app/Services/UserServices/user.service';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.css'],
})
export class ChangeRoleComponent implements OnInit {
  roles: any;
  userId = '';
  user: any;
  myForm: FormGroup;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dataTransferService: DataTransferService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.myForm = formBuilder.group({
      role: [''],
    });
  }

  capitalizeFirstLetter(string: string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }

  onSubmit() {
    this.userService
      .ChangeUserRole(
        this.user.email,
        this.myForm.controls['role'].value,
        this.authService.getToken()
      )
      .subscribe(
        (data) => this.router.navigate(['/users-list']),
        (err) => console.log(err)
      );
  }

  onCancel() {
    this.router.navigate(['/users-list']);
  }

  ngOnInit(): void {
    this.userId = this.dataTransferService.getData();
    if (this.userId != '') {
      this.userService.getUserById(this.userId).subscribe(
        (data) => {
          console.log(this.userId);
          this.user = data[0];
          this.myForm.patchValue({ role: this.user.role });
          this.roles = ['admin', 'merchant', 'user'].filter(
            (r) => r != this.user.role
          );
        },
        (err) => console.log(err)
      );
    } else this.router.navigate(['/users-list']);
  }
}
