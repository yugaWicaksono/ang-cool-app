import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from '../core/material.module';
import { AppRoutingModule } from '../core/app.routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent, LoginService } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    ToolbarComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ApolloModule,
    HttpClientModule,
    HttpLinkModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:4005/graphql',
            withCredentials: true
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
