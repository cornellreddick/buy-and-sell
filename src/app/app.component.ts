import { Component, NgZone, Input, ViewChild } from '@angular/core';
import { UserInterface } from './user/user/user.component';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
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
  isSubmitted = false;
  currentPage = 1;

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

  constructor(private http: HttpClient, private carService: CarService, private zone: NgZone, private formBuilder: FormBuilder, private toastr: ToastrService) { 
    console.log('config', carService.carConfig);
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
        this.isSubmitted = true;
      console.log('onSubmit', this.registerForm.value);
      this.toastr.success('Form successfully submitted');
    }else{
      this.isSubmitted = true;
      this.toastr.error('Please fill in every field.');
    }
  }

  ngOnInit(): void {

    this.registerForm.get('username')?.valueChanges.subscribe(value =>{
      console.log('valueChanges', value);
    })

    this.http.get('http://localhost:3004/users').subscribe();
    this.isLoading$.next(true);
    this.http.get<UserInterface[]>('http://localhost:3004/users').subscribe(
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
}

