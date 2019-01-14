import { Component, OnInit, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import gql from 'graphql-tag';

@Injectable()
export class LoginService {
  mutation = gql`
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        id
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
  data: any;

  constructor(private LoginAction: LoginService, private router: Router) {}

  async userLogin(email, password) {
    await this.LoginAction.login(email, password).subscribe(data => {
      console.log(data);
      if (data.login !== null) {
        this.router.navigate(['users']);
      } else {
        this.router.navigate(['']);
      }
    });
  }
}
