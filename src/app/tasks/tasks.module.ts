import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks/tasks.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TasksComponent, CreateTaskComponent],
  imports: [CommonModule, TasksRoutingModule, ReactiveFormsModule],
})
export class TasksModule {}
