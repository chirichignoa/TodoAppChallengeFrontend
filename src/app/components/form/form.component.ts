import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/models/todo';
import { Router } from '@angular/router';


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
  selectedFile: File;
  error = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder,
              private todoService: TodoService,
              private router: Router) {
    this.error = false;
    this.errorMessage = '';
    this.createTodoForm = formBuilder.group({
      todoTitle: ['', Validators.required],
      todoDescription: ['', Validators.required],
      todoImage: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.createTodoForm['todoImage'] = this.selectedFile;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.createTodoForm.value.todoTitle);
    formData.append('description', this.createTodoForm.value.todoDescription);
    formData.append('image', this.selectedFile);
    this.todoService.createTodo(formData)
    .subscribe(
      (data: Todo) => {
        this.router.navigate(['/home']);
      }, (error) => {
        this.error = true;
        this.errorMessage = error;
      }
    );
  }
}
