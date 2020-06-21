import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Users} from '../model/users';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private  url = environment.baseUrl + '/login';
  constructor(private httpClient: HttpClient) { }
  public authenticate(user: Users) {
    return this.httpClient.post(this.url, user, {observe: 'response'});
  }
  public hasAnAuthority(authorities): boolean {
    let  valid = false;
    const token = localStorage.getItem('token');
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token);
    const roles = decodedToken.roles;
    roles.forEach(role => {
      if (authorities.includes(role)) {
        valid = true;
      }
    });
    return valid;
  }
  logout() {
    localStorage.removeItem('token');
    location.reload();
  }
}
