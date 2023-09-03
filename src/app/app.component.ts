import { Component, Input } from '@angular/core';
import { UserInterface } from './user/user/user.component';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { Article } from './article';
import {animate, state, style, transition, trigger } from '@angular/animations';

export interface User{
  name: string;
  surName: string;
  age: string;
}

const fadeInOut = trigger('fadeInOut', [
  state('open', style({opacity:1})),
  state('close', style({opacity:0})),
  transition('open => close', [animate('1s ease-out')]),
  transition('close => open', [animate('1s ease-in')]),
]);

// const enterTransitions = transition(':enter', [
//   style({
//     opacity: 0
//   }),
//   animate('1s ease-in', style({opacity: 1})),
// ]);
// const exitTransitions = transition(':leave', [
//   style({
//     opacity: 1
//   }),
//   animate('1s ease-out', style({opacity: 0})),
// ]);
// const fadeIn = trigger('fadeIn', [enterTransitions])
// const fadeOut = trigger('fadeOut', [exitTransitions])

export interface Person{
  id: string;
  firstName: string;
  lastName: string;
  age: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInOut]
})
export class AppComponent {
  title = 'buy-and-sell';
  users$ = new BehaviorSubject<UserInterface[]>([])
  isLoading$ = new BehaviorSubject<boolean>(false);
  article: Article | null = { id: '1', title: 'Big Boss'};
  numbers = [1, 2, 3, 4, 5, 6 ];
  isShown = false;
  hello = 'hello';
  currentDate = new Date();

  person = {
    id: '1',
    firstName: 'Mike',
    lastName: 'Jones',
    age: '35'
  };

  currentUsers: User[] = [{name: 'Cornell', surName: 'ahnovel', age: '44'}];

  fun$ = of('fun');
  boring$ = of('boring');
  cool$ = of('cool');

  data$ = combineLatest({
    fun: this.fun$,
    boring: this.boring$,
    cool: this.cool$
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/users').subscribe();
    this.isLoading$.next(true);
    this.http.get<UserInterface[]>('http://localhost:4200').subscribe(
     (users) => {
      this.users$.next(users);
      this.isLoading$.next(false);
     }
    )
  }

  fadeInOut(): void {
    this.isShown = !this.isShown;
  }
}
