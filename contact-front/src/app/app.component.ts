import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './shared/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private  authenticationService: AuthenticationService) {}
  deconnexion() {
    this.authenticationService.logout();
  }


}
