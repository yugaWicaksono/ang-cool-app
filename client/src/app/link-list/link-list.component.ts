import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Link } from '../types';

// 1
import { ALL_LINKS_QUERY, AllLinksQueryResponse } from '../graphql';

@Component({
  selector: 'hn-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css']
})
export class LinkListComponent implements OnInit {
  // 2
  allLinks: Link[] = [];
  loading = true;

  // 3
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery<AllLinksQueryResponse>({
        query: ALL_LINKS_QUERY
      })
      .valueChanges.subscribe(res => {
        this.allLinks = res.data.allLinks;
        this.loading = res.data.loading;
      });
  }
  // 4
}
