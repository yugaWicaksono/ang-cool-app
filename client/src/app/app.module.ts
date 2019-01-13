import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from '../core/material.module';
import { AppRoutingModule } from '../core/app.routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent, LoginService } from './login/login.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, UserComponent, ToolbarComponent, NotFoundPageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          connectToDevTools: true,
          link: httpLink.create({
            uri: 'http://127.0.0.1:4005/graphql'
          })
        };
      },
      deps: [HttpLink]
    },
    [LoginService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
