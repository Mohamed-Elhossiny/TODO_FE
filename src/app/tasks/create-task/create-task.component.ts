import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from 'src/app/service/tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  taskForm!: any;
  imageName!: any;
  selectedImage: File | null = null;
  users: any = [
    {
      name: 'Mohamed',
      userId: '65de1e3931a3ff2cee174b82',
    },
    {
      name: 'Ali',
      userId: '65de200e31a3ff2cee174b8e',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private service: TasksService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createFrom();
  }

  createFrom() {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      userId: ['', Validators.required],
      image: [null, Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
    });
  }

  setImage(e: any) {
    const file = e.target.files[0];

    this.taskForm.get('image').setValue(file);

    this.selectedImage = file;
    this.imageName = file ? file.name : '';
  }

  createTask() {
    this.spinner.show();
    let model = this.prepareForm();
    console.log(this.taskForm.value);
    this.service.createTask(model).subscribe(
      (res) => {
        console.log(res);
        this.spinner.hide();
        this.toaster.success('Task Added Success', 'Success');
        this.dialog.closeAll();
      },
      (error) => {
        console.log(error);
        this.toaster.error(error.error.massage);
        this.spinner.hide();
      }
    );
  }

  prepareForm() {
    let newDate = moment(this.taskForm.value['deadline']).format('DD-MM-YYYY');
    let formData = new FormData();
    Object.entries(this.taskForm.value).forEach(([key, value]: any) => {
      if (key == 'deadline') {
        formData.append(key, newDate);
      } else {
        formData.append(key, value);
      }
    });

    return formData;
  }
}
