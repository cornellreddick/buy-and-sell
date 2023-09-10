import { Component, NgZone, Input, ViewChild } from '@angular/core';
import { UserInterface } from './user/user/user.component';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, combineLatest, concatMap, delay, exhaustMap, flatMap, from, map, mergeMap, observable, of, switchMap } from 'rxjs';
import { Article } from './article';
import {animate, state, style, transition, trigger } from '@angular/animations';
import { CarService } from './carservice';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

export interface PeopleInterface{
  id: string;
  name: string;
}

export interface UserDetailsInterface{
  id: string;
  age: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInOut]
})

export class AppComponent {
  @ViewChild('element', {static: true}) element: any;

  title = 'buy-and-sell';
  users$ = new BehaviorSubject<UserInterface[]>([])
  isLoading$ = new BehaviorSubject<boolean>(false);
  article: Article | null = { id: '1', title: 'Big Boss'};
  numbers = [1, 2, 3, 4, 5, 6 ];
  isShown = false;
  hello = 'hello';
  currentDate = new Date();
  position: any;

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
  people: PeopleInterface[] = [{
    id: '1',
    name: 'Cornell Reddick'
  },
  {
    id: '2',
    name: 'Letitia Goodjoint'
  }
  ];

  constructor(private http: HttpClient, private carService: CarService, private zone: NgZone, private formBuilder: FormBuilder, private toastr: ToastrService) { 



    const perso$ = this.getPeron('1').pipe(
      switchMap((people) => this.getPeopleDetails(people))
    );

    perso$.subscribe((person) => console.log('person', person));


    console.log('config', carService.carConfig);

    const person$ = new BehaviorSubject<Person[]>([]);
    const subject$ = new Subject()
    subject$.subscribe(res => console.log('subject', res));

    setTimeout(() => {
      this.users$.next([{id: '1', name: 'Mike', age: '34'}])
      subject$.next(1)
    }, 2000)

    this.users$.subscribe(res => console.log('res', res, this.users$.getValue()));

    const hello$ = of('1');
    hello$.subscribe((value) => console.log(value));

    hello$.toPromise().then((value) => (console.log('value', value)));

    //Hot observable is when Math.random is inside the observable. Below it is outside the observable making it cold.
    const random = Math.random();

    const observable = new Observable((observable => {
      observable.next(random);
    }));

    observable.subscribe((data) => {
      console.log(data);
    });
    observable.subscribe((data) => {
      console.log(data);
    });

    from([0,1,2,3,4]).pipe(map(el => el*10)).subscribe(console.log);
    const example = (operator: any) => () => {
      from([0,1,2,3,4])
      .pipe(operator((x: any)=> of(x).pipe(delay(500))))
      .subscribe(
        console.log,
        () => {},
        () => console.log(`${operator.name} completed`)
      );
    };

    example(mergeMap)();
    example(flatMap)();
    example(concatMap)();
    example(switchMap)();
    example(exhaustMap)();



  }

  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  })

  onSubmit(): void{
    if(this.registerForm.valid 
      && this.registerForm.value.password !== ""
      && this.registerForm.value.username !== "" 
      && this.registerForm.value.email !== ""  ){
      console.log('onSubmit', this.registerForm.value);
      this.toastr.success('Form successfully submitted');
    }else{
      this.toastr.error('Please fill in every field.');
    }
  }

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
  mouseDown(event: any){
    this.element = event?.target;
    this.zone.runOutsideAngular(()=> {
      window.document.addEventListener('mousemove', this.mouseMove.bind(this));
    })
  }
  mouseMove(event: any){
    event?.preventDefault();
    this.element.setAttribute('x', event.clientX);
    this.element.setAttribute('y', event.clientY);
  }
  mouseUp(event: any){
    this.zone.run(()=>{
      this.position = {
        x: this.element.getAttribute('x'),
        y: this.element.getAttribute('y'),
      };
    });
    window.document.removeEventListener('mousemove', this.mouseMove);
  }

  fadeInOut(): void {
    this.isShown = !this.isShown;
  }

  getPeron(id: string): Observable<PeopleInterface>{
    const people = this.people.find((people) => people.id === id)!;
    return of(people);
  }

  getPeopleDetails(people: PeopleInterface): Observable<UserDetailsInterface>{
    return of({id: people.id, age: 30});
  }

}

