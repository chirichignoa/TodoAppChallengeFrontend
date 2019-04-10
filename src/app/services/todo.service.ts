import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Todo } from '../models/todo';
import { throwError, Observable } from 'rxjs';
import { map, tap, catchError  } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly URL_API = 'http://localhost:8080/todo';
  private readonly PARAM_SEPARATOR = '&';
  private readonly QUERY_PARAM_ID = 'id';
  private readonly QUERY_PARAM_DESCRIPTION = 'description';
  private readonly QUERY_PARAM_STATUS = 'status';

  todos: Todo[] = [];

  constructor(private http: HttpClient) {

  }

  createTodo(todo: FormData) {
    return this.http.post(this.URL_API, todo)
    .pipe(map(data  => {
      console.log(data);
      this.todos.push(data['content']);
      return data['content'];
    }, error => {
      if (error) {
        return error['error'];
      }
    }
  ));
  }

  getTodos() {
    return this.http.get(this.URL_API)
    .pipe(
      map(data  => {
        this.todos = data['content'];
        return this.todos;
      }, error => {
        if (error) {
          return error['error'];
        }
      }
    ));
  }

  getTodosFiltered(id: string, description: string, status: string) {
    let params = new HttpParams();
    if (id != null && id !== '') {
      params = params.append(this.QUERY_PARAM_ID, id);
    }
    if (description != null && description !== '') {
      params = params.append(this.QUERY_PARAM_DESCRIPTION, description);
    }
    if (status != null && status !== '') {
      params = params.append(this.QUERY_PARAM_STATUS, status);
    }
    return this.http.get(this.URL_API, {params})
    .pipe(
      map((data: Todo[])  => {
        this.todos = data['content'];
        return this.todos;
      }, error => {
        if (error) {
          return error['error'];
        }
      }
    ));
  }

  updateTodoStatus(id: number) {
    const body = {id, status: 'DONE'};
    return this.http.patch(this.URL_API  + '/' + id, body)
    .pipe(
      map((data)  => {
        console.log(data);
        return data['content'];
      }, error => {
        if (error) {
          return error['error'];
        }
      }
    ));
  }
}
