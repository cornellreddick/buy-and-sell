import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../app.component';
import { Observable } from 'rxjs';
import { PersonInterface } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  
  API = 'http://localhost:3004/person'

  constructor(private http: HttpClient) { }

  getPerson(): Observable<PersonInterface[]> {
    return this.http.get<PersonInterface[]>(this.API);
  }
}
