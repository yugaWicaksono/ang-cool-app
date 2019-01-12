import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphQlModule } from './apollo.config';
import { LinkItemComponent } from './link-item/link-item.component';
import { LinkListComponent } from './link-list/link-list.component';

@NgModule({
  declarations: [AppComponent, LinkItemComponent, LinkListComponent],
  imports: [BrowserModule, GraphQlModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
