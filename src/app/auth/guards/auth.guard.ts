import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this._authService.verifyAuth().pipe(
      tap(isAuth=>{
        if(!isAuth){
          this._router.navigate(['./auth/login'])
        }
      })
    );
    // console.log("auth.id: ",this._authService.auth.id);
    

    // if(this._authService.auth.id){
    //   console.log("Can activate: ",true);
    //   return true;
    // }

    
    // console.log("Can activate: ",false);
    // return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
       
    return this._authService.verifyAuth().pipe(
      tap(isAuth=>{
        if(!isAuth){
          this._router.navigate(['./auth/login'])
        }
      })
    );
    // console.log("auth.id: ",this._authService.auth.id);
    

    // if(this._authService.auth.id){
    //   console.log("Can load: ",true);
    //   return true;
    // }

    
    // console.log("Can load: ",false);
    // return false;
  }
}
