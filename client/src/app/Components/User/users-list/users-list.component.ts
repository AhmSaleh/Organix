import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Models/IUser';
import { DataTransferService } from 'src/app/Services/DataTransferService/data-transfer.service';
import { UserService } from 'src/app/Services/UserServices/user.service';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  Users: IUser[] = [];
  filteredUsers: IUser[] = [];
  filterKeyword: string = '';

  constructor(
    private userservice: UserService,
    private dataTransferService: DataTransferService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userservice.getAllUsers().subscribe((Response) => {
      this.filteredUsers = Response;
      this.Users = this.filteredUsers;
    });
  }

  emptySearch(value: string): void {
    console.log(value);
    if (value == '') {
      console.log(this.filteredUsers);
      console.log(this.Users);
      this.filteredUsers = this.Users;
    }
  }

  updateRole(id: string) {
    this.dataTransferService.clearData();
    this.dataTransferService.setData(id);
    this.router.navigate(['/changerole']);
  }

  showUserOrders(id: string) {
    this.dataTransferService.clearData();
    this.dataTransferService.setData(id);
    this.router.navigate([`/orders`]);
  }

  search(value: string): void {
    this.filteredUsers = this.Users.filter(
      (user) =>
        user.name.first.toLowerCase().includes(value.toLowerCase()) ||
        user.name.last.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.role.toLowerCase().includes(value.toLowerCase())
    );
  }
}
