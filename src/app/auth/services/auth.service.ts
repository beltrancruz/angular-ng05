import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Auth } from "../interfaces/auth.interface";
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  constructor(private _http: HttpClient) { }


  verifyAuth(): Observable<boolean>{
    if(!localStorage.getItem('id')){
      return of(false);
    }


    return this._http.get<Auth>(`${this._baseUrl}/usuarios/1`).pipe(
      map(res=>{ 
        this._auth = res;
        return true;
      })
    );
  }

  get auth(){
    return {...this._auth}
  }

  login(){
    return this._http.get<Auth>(`${this._baseUrl}/usuarios/1`).pipe(
      tap(res=>this._auth = res),
      tap(auth=>localStorage.setItem('id',auth.id))
    );
  }

  logout(){
    this._auth = undefined;
  }
}
