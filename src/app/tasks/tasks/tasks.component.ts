import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/service/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  constructor(private service: TasksService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.getAllTask();
  }

  getAllTask() {
    this.service.getAllTasks().subscribe(
      (res) => {},
      (error) => {}
    );
  }

  createTask() {
    const dialogRef = this.dialog.open(CreateTaskComponent, { width: '750px' });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
