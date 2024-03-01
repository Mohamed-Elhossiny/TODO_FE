import { Component, Inject, OnInit } from '@angular/core';
import { TasksService } from 'src/app/service/tasks.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  displayedColumns: any = [
    'position',
    'title',
    'user',
    'description',
    'deadline',
    'status',
    'actions',
  ];
  dataSource: any = [];
  filteration: any = {};
  setTimOutID: any;
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

  status: any = [{ name: 'In-Progress' }, { name: 'Done' }, { name: 'Active' }];

  constructor(
    private service: TasksService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllTask();
  }

  getAllTask() {
    this.spinner.show();
    this.service.getAllTasks(this.filteration).subscribe(
      (res: any) => {
        this.dataSource = this.mappingData(res.tasks);
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.toaster.error(error.error.massage);
        this.spinner.hide();
      }
    );
  }

  createTask() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '750px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllTask();
      }
    });
  }

  mappingData(data: any[]) {
    let newData = data.map((item) => {
      return {
        ...item,
        user: item.userId.username,
      };
    });
    return newData;
  }

  deleteTask(id: any) {
    console.log(id);
    this.spinner.show();
    this.service.deleteTask(id).subscribe(
      (res: any) => {
        this.toaster.success(res.massage);
        this.spinner.hide();
        this.getAllTask();
      },
      (error) => {
        this.toaster.error(error.error.massage);
        this.spinner.hide();
      }
    );
  }

  updateTask(element: any) {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '750px',
      data: element,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllTask();
      }
    });
  }

  seacrh(event: any) {
    this.filteration['keyword'] = event.value;
    clearTimeout(this.setTimOutID);
    this.setTimOutID = setTimeout(() => {
      this.getAllTask();
    }, 1500);
  }

  selectUser(event: any) {
    this.filteration['userId'] = event.target.value;
    this.getAllTask();
  }

  selectstatus(event: any) {
    this.filteration['status'] = event.target.value;
    this.getAllTask();
  }

  selectDate(event: any, type: string) {
    console.log(event.target.value, type);
    this.filteration[type] = event.target.value.split('-').reverse().join('-');
    if (type === 'toDate') {
      this.getAllTask();
    }
  }
}
