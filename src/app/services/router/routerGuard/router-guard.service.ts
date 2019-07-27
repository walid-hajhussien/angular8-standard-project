import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../../authentication/auth.service';
import {RouterAccessService} from '../routerAccess/router-access.service';



@Injectable({
  providedIn: 'root'
})
export class RouterGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router, private authService: AuthService, private routerAccessService: RouterAccessService) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentRoute: string     = this.router.url;
    const nextRoute: string        = state.url;
    const isAuthenticated: boolean =  this.authService.isLogin;

    console.log('current route', currentRoute);

    console.log('next route', nextRoute);

    console.log('authService', isAuthenticated);

    console.log('routerAccessService', this.routerAccessService.getAccessRoute(nextRoute));

    if (isAuthenticated && this.routerAccessService.getAccessRoute(nextRoute)) {
        return true;
    } else {
      console.log("not authrized");
      return this.router.parseUrl('/login');
    }



  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return undefined;
  }
}
