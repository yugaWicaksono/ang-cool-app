import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../app/user/user.component';
import { LoginComponent } from '../app/login/login.component';
import { NotFoundPageComponent } from 'src/app/not-found-page/not-found-page.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user/:id', component: UserComponent },
  { path: '', component: LoginComponent },
  { path: '**', component: NotFoundPageComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
