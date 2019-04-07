import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Todo } from '../models/todo';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly URL_API = 'http://localhost:8080/todo';

  constructor(private http: HttpClient) {

  }

  createTodo(todo: FormData) {
    this.http.post(this.URL_API, todo).subscribe(
      data => {
        console.log(data);
      },
      error => {
        if (error) {
          console.log(error);
        }
      });
  }
}
