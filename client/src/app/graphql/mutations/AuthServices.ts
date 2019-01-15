import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Injectable } from '@angular/core';

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

  login(email: string, password: string) {
    return this.apollo.mutate({
      mutation: this.mutation,
      variables: {
        email: email,
        password: password
      }
    });
  }
}

@Injectable()
export class LogOutService {
  constructor(private apollo: Apollo) {}

  logout() {
    this.apollo.getClient().resetStore();
  }
}
