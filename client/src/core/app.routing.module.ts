import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../app/user/user.component';
import { LoginComponent } from '../app/login/login.component';
import { NotFoundPageComponent } from 'src/app/not-found-page/not-found-page.component';
import { UserFeedComponent } from 'src/app/user-feed/user-feed.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'users',
    component: UserFeedComponent,
    children: [{ path: ':lastname', component: UserComponent }]
  },
  { path: '', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: '**', component: NotFoundPageComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
