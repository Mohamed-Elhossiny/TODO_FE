import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  baseUrl: string = 'https://crud-107i.onrender.com/';
  constructor(private httpClient: HttpClient) {}

  getAllTasks() {
    return this.httpClient.get(this.baseUrl + 'tasks/all-tasks');
  }

  createTask(model: any) {
    return this.httpClient.post(this.baseUrl + 'tasks/add-task', model);
  }
}
