import { Component, OnInit } from '@angular/core';

import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/models/todo';
import { map, filter, scan } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todos: Todo[] = [];
  url = 'http://localhost:8080/';
  id = '';
  description = '';
  status = '';
  filterApplied = false;
  error = false;
  errorMessage = '';

  constructor(private todoService: TodoService) {
    this.error = false;
    this.errorMessage = '';
    this.todoService.getTodos()
    .subscribe(( data: Todo[] ) => { this.todos = data; },
     (error => {
        if (error instanceof HttpErrorResponse) {
          this.error = true;
          const err = error.message || JSON.stringify(error.error);
          this.errorMessage = `${error.statusText || ''} Details: ${err}`;
        } else {
        this.error = true;
        this.errorMessage = error;
        }
      }));
  }

  ngOnInit() {
  }

  onFilterClick() {
    this.todoService.getTodosFiltered(this.id, this.description, this.status)
    .subscribe(( data: Todo[] ) => {
      this.todos = data;
     }, (error => {
      this.error = true;
      this.errorMessage = error;
     }));
    this.filterApplied = true;
  }

  onClearFilterClick() {
    this.id = '';
    this.description = '';
    this.status = '';
    this.todoService.getTodos()
    .subscribe(( data: Todo[] ) => {
      this.todos = data;
    } , (error => {
      this.error = true;
      this.errorMessage = error;
     }));
    this.filterApplied = false;
  }

  onResolvedClicked(index: number) {
    const id = this.todos[index].id;
    this.todoService.updateTodoStatus(this.todos[index].id)
      .subscribe((data: number) => {
        if (data === id) {
          this.todos[index].status = 'DONE';
        }
      }, (error => {
        this.error = true;
        this.errorMessage = error;
       }));
  }

}
