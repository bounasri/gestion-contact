import {Component, OnInit} from '@angular/core';
import {Users} from '../shared/model/users';
import {AuthenticationService} from '../shared/auth/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Users = new Users();
  constructor(private authenticationService: AuthenticationService,
              private  router: Router) {
  }

  ngOnInit() {
  }
  authenticate() {
    this.authenticationService.authenticate(this.user).subscribe( res => {
      const token = res.headers.get('Authorization');
      localStorage.setItem('token', token);
      this.router.navigate(['/list-user']);
    }, err => {
      console.log(err);
    });
  }
}
