import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { TasksService } from 'src/app/service/tasks.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';

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
  page: any;
  total: any;
  dataSource: any = [];
  filteration: any = {
    page: 1,
    limit: 5,
  };
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
    private toaster: ToastrService
  ) {}
  @ViewChild(MatPaginator) paginator = {} as MatPaginator;
  ngOnInit(): void {
    this.getAllTask();
  }
  getAllTask() {
    this.service.getAllTasks(this.filteration).subscribe(
      (res: any) => {
        this.dataSource = this.mappingData(res.tasks);
        this.dataSource.paginator = this.paginator;
        this.total = res.totalItems;
      },
      (error) => {
        console.log(error);
        this.toaster.error(error.error.massage);
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
    this.service.deleteTask(id).subscribe(
      (res: any) => {
        this.toaster.success(res.massage);
        this.getAllTask();
      },
      (error) => {
        this.toaster.error(error.error.massage);
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

  changePage(event: any) {
    this.page = event.pageIndex + 1;
    this.filteration['page'] = this.page;
    this.filteration['limit'] = event.pageSize;
    this.getAllTask();
  }
}
