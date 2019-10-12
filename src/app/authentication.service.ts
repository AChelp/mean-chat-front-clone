import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { serverUrl } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedIn = false;

  constructor(private http: HttpClient) {
  }

  public signUpUser(user): any {
    return this.http.post<any>(
      `${serverUrl}/signup`,
      user
    ).pipe(first(), map(data => {
      return data;
    }));
  }

  public loginUser(user): any {
    return this.http.post<any>(
      `${serverUrl}/login`,
      user
    ).pipe(first(), map(data => {
      if (data.success) {
        this.isLoggedIn = true;
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
      }

      return data;
    }));
  }

  public chekLogIn() {
    return this.isLoggedIn;
  }
}
