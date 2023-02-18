import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, take, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { User } from '../modules/user.model';

const BACKEND_URL = environment.apiUrl + '/auth';

interface AuthData {
  email: string,
  password: string,
  pseudo?: string,
  nom?: string,
  prenom?: string,
  privilege?: string,
  societe?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // loggedIN  as an observable 
  loggedIn: Subject<boolean>;
  Senduser:User;
  
  get isAuth() {
    return this.loggedIn.asObservable();
  }
  get user() {
    return this.Senduser;
  }

  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService) {
    this.loggedIn = new Subject();
    this.getLogin();
   }

    // register user
  createUser(
    email: string,
    nom: string,
    prenom: string,
    password: string
  ) {
    const authData: AuthData = {
      email: email,
      password: password,
      nom: nom,
      prenom: prenom,
    };
    return this.http.post<{ message: string }>(`${BACKEND_URL}/signup`, authData)
      .pipe(take(1));
  }
    // auth user
  login(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password,
    }
     this.http.post(BACKEND_URL+"/login", authData,
      {
      withCredentials: true // turn it to true for the credentials to be passable through a call.
    }
    ).subscribe((resp: any) => {
      this.loggedIn.next(true);
      this.toastr.success(resp && resp.user && resp.user.nom ? `Welcome ${resp.user.nom}` : ' Logged in!');
      this.getLogin()
      this.router.navigateByUrl('dashboard/home');
    }, (errorResp) => {
      this.loggedIn.next(false);
      console.log(errorResp)
      errorResp.error ? this.toastr.error(errorResp.error.message) : this.toastr.error('An unknown error has occured.');
      this.router.navigateByUrl('login');
    });
  }


  getLogin() {
    return this.http.get(BACKEND_URL + '/login', 
    {
      withCredentials: true 
    }
    ).subscribe((resp: any) => {
      this.loggedIn.next(resp.loggedIn);
      this.Senduser = resp.user;
    }, (errorResp) => {
      this.toastr.error('Oops, get something went wrong getting the logged in status')
    })
  }

  // logout user
  logout() {
    this.http.post(BACKEND_URL + '/logout', {}, 
    {
      withCredentials: true
    }
    ).subscribe(() => {
      this.loggedIn.next(false);
      this.router.navigateByUrl('login');

    });
  }

}
