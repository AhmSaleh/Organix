import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/Models/IUser';
import { DetailsService } from 'src/app/Services/UserServices/DetailsService/details.service.spec';

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
  constructor(UserDetailservice: DetailsService) {
    UserDetailservice.getUser().subscribe(
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
