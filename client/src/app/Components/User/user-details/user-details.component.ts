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
    phone: '',
    addresses: [],
  };
  addressesCounter = 0;
  constructor(UserService: UserService) {
    UserService.getUser().subscribe(
      (response) => {
        this.User = response;
      },
      (error) => {
        console.error('Request failed with error');
      }
    );
  }
  getAddressesCounter(): Number {
    console.log(this.addressesCounter);
    this.addressesCounter++;
    return this.addressesCounter;
  }

  ngOnInit(): void {}
}
