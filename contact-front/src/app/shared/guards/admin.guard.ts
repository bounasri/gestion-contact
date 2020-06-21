import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthenticationService} from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate  {
  constructor(private  authenticationService: AuthenticationService,
              private  router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
    | boolean | UrlTree {
    if (this.authenticationService.hasAnAuthority(['ROLE_Admin'])) {
      return true;
    }
    this.router.navigate([this.router.url]);
    return false;
  }
}
