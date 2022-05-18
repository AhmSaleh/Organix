import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/Models/IUser';
import { UserService } from 'src/app/Services/UserServices/user.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
  newImg: any;

  constructor(private UserService: UserService) {
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
  trackByFn(index: number, item: any) {
    return index;
  }
  imageSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newImg = file;
      this.createImageFromBlob(this.newImg);
    }
  }
  onSubmit() {
    const formData = new FormData();
    if (this.newImg) formData.append('img', this.newImg);
    formData.append('phone', this.User.phone);
    formData.append('addresses', JSON.stringify(this.User.addresses));
    formData.append('name', JSON.stringify(this.User.name));

    console.log('Hnaa');
    this.UserService.updateUser(formData).subscribe(
      (res) => {
        if (!res)
          Notify.success('Updated Successfully!', { closeButton: true });
      },
      (err) => Notify.failure("Coudn't update!", { closeButton: true })
    );
  }
}
