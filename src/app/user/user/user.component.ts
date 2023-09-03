import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from 'src/app/users.service';

export interface UserInterface {
  id: string;
  name: string;
  age: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  //users$ = this.http.get('http://localhost:3004');
  //users: UserInterface[] = []; 
  @Output() newItemEvent = new EventEmitter<string>();
  users$ = new BehaviorSubject<UserInterface[]>([])
  isLoading$ = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private userService: UsersService) { }

  users: UserInterface[] = [];

  ngOnInit(): void {
    // this.isLoading$.next(true);
    // this.http.get<UserInterface[]>('http://localhost:4200').subscribe(
    //  (users) => {
    //   this.users$.next(users);
    //   this.isLoading$.next(false);
    //  }
    // )

    this.userService.getUser().subscribe(
      data => {
        this.users = data;
      }
    )
  }

  addNewItem(value: string){
    this.newItemEvent.emit(value);
  }

}
