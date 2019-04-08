import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/models/todo';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  createTodoForm: FormGroup;
  loading = false;
  submitted = false;
  fileName = '';
  newTodo: Todo = new Todo();
  selectedFile: File;

  constructor(private formBuilder: FormBuilder,
              private todoService: TodoService) {
    this.createTodoForm = formBuilder.group({
      todoTitle: ['', Validators.required],
      todoDescription: ['', Validators.required],
      todoImage: ['']
    });
   }

  ngOnInit() {
  }

  selectFile(imageInput: any) {
    this.newTodo.image = imageInput.files[0];
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.createTodoForm.value.todoTitle);
    formData.append('description', this.createTodoForm.value.todoDescription);
    formData.append('image', this.selectedFile);
    this.todoService.createTodo(formData);
  }
}
