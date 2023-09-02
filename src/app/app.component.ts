import { Component, Input } from '@angular/core';
import { UserInterface } from './user/user/user.component';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Article } from './article';
import {animate, style, transition, trigger } from '@angular/animations';

const enterTransitions = transition(':enter', [
  style({
    opacity: 0
  }),
  animate('1s ease-in', style({opacity: 1})),
]);
const fadeIn = trigger('fadeIn', [enterTransitions])

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeIn]
})
export class AppComponent {
  title = 'buy-and-sell';
  users$ = new BehaviorSubject<UserInterface[]>([])
  isLoading$ = new BehaviorSubject<boolean>(false);
  article: Article | null = { id: '1', title: 'Big Boss'};
  numbers = [1, 2, 3, 4, 5, 6 ];
  isShown = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
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
