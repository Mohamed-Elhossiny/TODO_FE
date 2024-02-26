import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  createTaskForm!: any;
  imageName!: any;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.createFrom();
  }

  createFrom() {
    this.createTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      userId: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
    });
  }

  setImage(event: any) {
    this.imageName = event.target.value;
  }

  createTask() {
    console.log(this.createTaskForm.value);
  }
}
