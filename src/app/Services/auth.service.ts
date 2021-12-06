import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = 'https://routeegypt.herokuapp.com/';

  constructor(private _HttpClient: HttpClient, private _location: Location) {
  }

  signUp(data): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'signup', data);
  }

  signIn(data): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'signin', data);
  }

  signOut(data): Observable<any> {
    return this._HttpClient.post(this.baseURL + 'signOut', data);
  }

  isLoggedIn(): any {
    return localStorage.getItem('TOKEN');
  }

  isSignIn(): any {
    if (this._location.path() === '/signin') {
      return true;
    }
  }

  isSignUp(): any {
    if (this._location.path() === '/signup') {
      return true;
    }
  }
}
