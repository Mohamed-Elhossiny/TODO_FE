import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private httpClient: HttpClient) {}

  getAllTasks() {
    return this.httpClient.get(environment.baseAPi + 'all-tasks');
  }

  createTask(model: any) {
    return this.httpClient.post(environment.baseAPi + 'add-task', model);
  }
}
