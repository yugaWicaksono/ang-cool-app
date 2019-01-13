import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Query } from '../types';

// We use the gql tag to parse our query string into a query document
const hello = gql`
  query hello {
    hello
  }
`;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loading: boolean;
  hello: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery<Query>({
        query: hello
      })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(data);
        this.loading = loading;
        this.hello = data.hello;
      });
  }

  // ngOnDestroy() {
  //   this.querySubscription.unsubscribe();
  // }
}
