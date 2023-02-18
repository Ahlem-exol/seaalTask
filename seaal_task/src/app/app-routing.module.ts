import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth/auth-guard';

const routes: Routes = [
  {
    path: 'dashboard', component: HeaderComponent,canActivate: [AuthGuard],
    children: [
      {path: 'home', component: HomeComponent},
     
      {path: 'about', component: AboutComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
