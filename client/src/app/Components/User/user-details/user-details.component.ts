import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/Models/IUser';
import { UserService } from 'src/app/Services/UserServices/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  User: IUser = {
    _id: '',
    email: '',
    hash: '',
    name: { first: '', last: '' },
    role: '',
  };
  constructor(UserService: UserService) {
    UserService.getUser().subscribe(
      (response) => {
        console.log('response received');
        this.User = response;
        console.log(this.User);
      },
      (error) => {
        console.error('Request failed with error');
      }
    );
  }

  ngOnInit(): void {}
}
