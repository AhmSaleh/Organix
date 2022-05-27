import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Notify } from 'notiflix';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/Components/User/login/login.component';
import { AuthService } from 'src/app/Services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private route: Router, private modalService: NgbModal) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.auth.isLoggedIn()) return true;
    else {
      // this.route.navigate(['./login']);
      this.openLoginModal();
      Notify.warning('PLease login first to processed', {
        closeButton: true,
        timeout: 1000
      });
      return false;
    }
  }

  openLoginModal() {
    const modalRef = this.modalService.open(LoginComponent, {
      backdropClass: 'modal',
      windowClass: 'bg-dark',
    });
  }
}
