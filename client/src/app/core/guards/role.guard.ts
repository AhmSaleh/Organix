import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.isAuthorized(route);
  }

  isAuthorized(route: ActivatedRouteSnapshot): boolean {
    const expecteRole = route.data['expecteRole'];
    if (expecteRole.indexOf(this.auth.getRole()) != -1) return true;
    else {
      this.router.navigate(['/home']);
      Notify.failure('Authorization is required to perform this action', {
        closeButton: true,
      });
      return false;
    }
  }
}
