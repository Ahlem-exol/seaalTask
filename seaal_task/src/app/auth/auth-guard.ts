import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  // this class implement to be a guard deciding if a route can be activated or note.
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
  return this.authService.isAuth.pipe(
    take(1),
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        this.router.navigateByUrl('login');
      } else {
        return true;
      }
    })
  )
}
}