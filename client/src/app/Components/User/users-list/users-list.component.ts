import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/Models/IUser';
import { UserService } from 'src/app/Services/UserServices/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  Users:IUser[] = [];

  constructor(private userservice : UserService) {}

  ngOnInit(): void {
    this.userservice.getAllUsers().subscribe(
      (Response) => {
        this.Users = Response;
      }
    )
  }

}
