import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from 'src/app/Models/IUser';
@Pipe({
  name: 'usersListFilter',
})
export class UsersListFilterPipe implements PipeTransform {
  transform(usersLst: IUser[], filterText: string): IUser[] {
    return usersLst
      ? usersLst.filter(
          (user) =>
            user.name.first.search(new RegExp(filterText, 'i')) > -1 ||
            user.name.last.search(new RegExp(filterText, 'i')) > -1 ||
            user.email.search(new RegExp(filterText, 'i')) > -1 ||
            user.role.search(new RegExp(filterText, 'i')) > -1
        )
      : [];
  }
}
