import { Component, OnInit } from '@angular/core';
import { Observable, concatMap, of } from 'rxjs';

export interface PeopleInterface{
  id: string;
  name: string;
}

export interface UserDetailsInterface{
  id: string;
  age: number;
}

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  [x: string]: any;

  people: PeopleInterface[] = [{
    id: '1',
    name: 'Cornell Reddick'
  },
  {
    id: '2',
    name: 'Letitia Goodjoint'
  }
  ];

  constructor() { 
    const person$ = this.getPeron('1').pipe(
      concatMap((people) => this.getPeopleDetails(people))
    );

    person$.subscribe((person) => console.log('person', person));

    
  }

  ngOnInit(): void {

  }
  getPeron(id: string): Observable<PeopleInterface>{
    const people = this.people.find((people) => people.id === id)!;
    return of(people);
  }

  getPeopleDetails(people: PeopleInterface): Observable<UserDetailsInterface>{
    return of({id: people.id, age: 30});
  }

}
