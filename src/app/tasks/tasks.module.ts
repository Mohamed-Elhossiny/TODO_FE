import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks/tasks.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@NgModule({
  declarations: [TasksComponent, CreateTaskComponent, ConfirmationComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    
  ],
})
export class TasksModule {}
