import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/Models/IUser';
import { UserService } from 'src/app/Services/UserServices/user.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Router } from '@angular/router';

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

  constructor(private UserService: UserService, private router: Router) {
    UserService.getUserPFP().subscribe(
      (response) => {
        this.createImageFromBlob(response);
      },
      (error) => {
        Notify.failure("Coudn't get user Profile Picture!", {
          closeButton: true,
        });
      }
    );

    UserService.getUser().subscribe(
      (response) => {
        this.User = response;

        this.User.addresses.forEach((element, index) => {
          let newAddress = document.createElement(`div`);
          let addressHead = document.createElement(`h6`);
          let addressInput = document.createElement(`input`);

          addressHead.setAttribute('class', 'mb-2');
          addressHead.appendChild(
            document.createTextNode(`Address ${index + 1}`)
          );

          addressInput.setAttribute('name', `${index}`);
          addressInput.setAttribute('value', element);

          newAddress.appendChild(addressHead);
          newAddress.appendChild(addressInput);

          document?.getElementById('addresses')?.appendChild(newAddress);
        });
      },
      (error) => {
        Notify.failure("Coudn't get user information!", {
          closeButton: true,
        });
      }
    );
  }
  ngOnInit(): void {}

  onCancel() {
    this.router.navigate(["/home"]);
  }
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
    this.User.addresses.forEach((element, index) => {
      this.User.addresses[index] = (
        document?.getElementById('addresses')?.childNodes[index + 1]
          ?.childNodes[1] as HTMLInputElement
      ).value;
    });

    this.User.addresses.forEach((element, index) => {
      console.log(element);
    });

    const formData = new FormData();
    if (this.newImg) formData.append('img', this.newImg);
    formData.append('phone', this.User.phone);
    formData.append('addresses', JSON.stringify(this.User.addresses));
    formData.append('name', JSON.stringify(this.User.name));

    this.UserService.updateUser(formData).subscribe(
      (res) => {
        if (!res)
          Notify.success('Updated Successfully!', { closeButton: true });
      },
      (err) => Notify.failure("Coudn't update!", { closeButton: true })
    );
  }
  addNewAddressInput(addresses: any) {
    let newAddress = document.createElement(`div`);
    let addressHead = document.createElement(`h6`);
    let addressInput = document.createElement(`input`);

    addressHead.setAttribute('class', 'mb-2');
    addressHead.appendChild(
      document.createTextNode(`Address ${this.User.addresses.length + 1}`)
    );

    addressInput.setAttribute('name', `${this.User.addresses.length}`);

    newAddress.appendChild(addressHead);
    newAddress.appendChild(addressInput);

    addresses.appendChild(newAddress);

    this.User.addresses.push('');
    console.log(document.getElementById('addresses'));
  }
}
