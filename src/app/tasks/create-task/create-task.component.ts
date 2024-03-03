import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from 'src/app/service/tasks.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

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
  oldFromdata: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private service: TasksService,
    private toaster: ToastrService,
    private matDialog: MatDialogRef<any>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createFrom();
  }

  createFrom() {
    this.taskForm = this.formBuilder.group({
      title: [
        this.data?.title || '',
        [Validators.required, Validators.minLength(5)],
      ],
      userId: [this.data?.userId._id || '', Validators.required],
      image: [this.data?.image || null, Validators.required],
      description: [this.data?.description || '', Validators.required],
      deadline: [
        this.data
          ? new Date(
              (this.data?.deadline).split('-').reverse().join('-')
            ).toISOString()
          : '',
        Validators.required,
      ],
    });

    this.oldFromdata = this.taskForm.value;
  }

  setImage(e: any) {
    const file = e.target.files[0];

    this.taskForm.get('image').setValue(file);

    this.selectedImage = file;
    this.imageName = file ? file.name : '';
  }

  createTask() {
    let model = this.prepareForm();
    this.service.createTask(model).subscribe((res: any) => {
      console.log(res);
      this.toaster.success(res.massage, 'Success');
      this.matDialog.close(true);
    });
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

  closeDialog() {
    let isChanged = false;
    Object.keys(this.oldFromdata).forEach((item) => {
      if (this.oldFromdata[item] != this.taskForm.value[item]) {
        isChanged = true;
      }
    });

    if (isChanged) {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '500px',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
        }
      });
    } else {
      this.matDialog.close();
    }
  }

  updateTask() {
    let model = this.prepareForm();
    this.service.updateTask(model, this.data._id).subscribe((res: any) => {
      console.log(res);
      this.toaster.success(res.massage, 'Success');
      this.matDialog.close(true);
    });
  }
}
