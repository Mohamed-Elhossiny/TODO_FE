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
        this.data?.Title || '',
        [Validators.required, Validators.minLength(5)],
      ],
      description: [this.data?.Description || '', Validators.required],
      isComplete: [this.data?.IsComplete || false, Validators.required],
    });
    debugger;
    this.oldFromdata = this.taskForm.value;
  }

  createTask() {
    //let model = this.prepareForm();
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
      this.service.createTask(newTask).subscribe((res: any) => {
        console.log(res);
        this.toaster.success(res.massage, 'Success');
        this.matDialog.close(true);
      });
    }
  }

  prepareForm() {
    let formData = new FormData();
    Object.entries(this.taskForm.value).forEach(([key, value]: any) => {
      formData.append(key, value);
    });

    return formData;
  }

  closeDialog() {
    let isChanged = false;
    
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
    if (this.taskForm.valid) {
      const updatedTask = this.taskForm.value;
      debugger;
      this.service
        .updateTask(updatedTask, this.data.Id)
        .subscribe((res: any) => {
          console.log(res);
          if (res.responseID == 1) {
            this.toaster.success(res.massage, 'Success');
            this.matDialog.close(true);
          }
        });
    }
  }
}
