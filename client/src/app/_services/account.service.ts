import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    //Como en postman       URL           Cuerpo          Body
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      //Para darle un tipo a "user" y asi evitar el error, es necesario rodearlo de ()
      //  de este modo map((user: User) =>{})
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
