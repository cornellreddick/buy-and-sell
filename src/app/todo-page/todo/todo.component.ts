import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoInterface } from 'src/app/todo-interface';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  someLocalProp = 'Some local Property';

  @Input('todo') todoProps!: TodoInterface;

  filter$: Observable<string> = this.todoService.filter$;

  checkRender(){
    console.log('check render');
    return true; 
  }

  changeSomeLocalProp(){
    this.someLocalProp = 'Changed some local props';
  }
  changeFilter(){
    this.todoService.filter$.next('active');
  }

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {


  }

}
