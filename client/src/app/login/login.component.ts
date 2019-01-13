import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

// We use the gql tag to parse our query string into a query document
const CurrentUserForProfile = gql`
  query CurrentUserForProfile {
    currentUser {
      name
      age
    }
  }
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean;
  currentUser: any;

  private querySubscription: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<any>({
        query: CurrentUserForProfile
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.currentUser = data.currentUser;
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
