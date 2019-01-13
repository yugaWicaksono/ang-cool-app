import { Component, OnInit, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import gql from 'graphql-tag';

@Injectable()
export class LoginService {
  mutation = gql`
    mutation Login($email: String!, $password: String!) {
      Login(email: $email, password: $password) {
        name
        age
      }
    }
  `;

  constructor(private apollo: Apollo) {}

  login(email, password) {
    return this.apollo.mutate({
      mutation: this.mutation,
      variables: {
        email: email,
        password: password
      }
    });
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private LoginAction: LoginService, private router: Router) {}

  userLogin(email, password) {
    this.LoginAction.login(email, password).subscribe(() => {
      this.router.navigateByUrl('user');
    });
  }
}
