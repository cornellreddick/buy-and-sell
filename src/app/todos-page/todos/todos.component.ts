import { Component, OnInit } from '@angular/core';
import { TodoInterface } from 'src/app/todo-interface';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: TodoInterface[] = [{
    id: '1', 
    text: 'First todo',
    isCompleted: true
  },{
    id: '2', 
    text: 'Second todo',
    isCompleted: true
  },{
    id: '3', 
    text: 'third todo',
    isCompleted: false
  },
  ];

  changeText(){
    console.log('change text');
  }

  changeArray(){
    // this.todos[0].text = 'foo';
    this.todos[0] = {...this.todos[0], text: 'Fooo'};
  }

  constructor() { }

  ngOnInit(): void {
  }

}
