import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../graphql/mutations/AuthServices';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private LoginAction: LoginService, private router: Router) {}

  userLogin(email: string, password: string) {
    this.LoginAction.login(email, password).subscribe(data => {
      if (data !== undefined) {
        this.router.navigate(['user']);
      } else {
        this.router.navigate(['']);
      }
    });
  }
}
