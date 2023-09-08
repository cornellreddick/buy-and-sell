import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from './user/user/user.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API = 'http://localhost:3004/users';

  constructor(private http: HttpClient) { }


  getUser(): Observable<UserInterface[]>{
    return this.http.get<UserInterface[]>(this.API);
  }

}
