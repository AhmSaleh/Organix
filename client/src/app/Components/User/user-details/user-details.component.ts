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
  img: any;

  constructor(UserService: UserService) {
    UserService.getUserPFP().subscribe(
      (response) => {
        this.createImageFromBlob(response);
      },
      (error) => {
        console.error('Request failed with error');
      }
    );
    UserService.getUser().subscribe(
      (response) => {
        this.User = response;
      },
      (error) => {
        console.error('Request failed with error');
      }
    );
  }
  ngOnInit(): void {}

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.img = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
