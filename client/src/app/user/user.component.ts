// absolute imports ;
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';

// relative import;
import { Query, LoggedUser } from '../graphql/types/Query';
import { LOGGED_USER } from '../graphql/queries/LoggedUser';
import { Subscription } from 'apollo-client/util/Observable';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  loading: boolean;
  loggedUser: LoggedUser;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo
      .watchQuery<Query>({
        query: LOGGED_USER
      })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(data);
        this.loading = loading;
        this.loggedUser = data.loggedUser;
      });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}
