import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private httpClient: HttpClient) {}

  getAllTasks() {
    return this.httpClient.get(environment.baseAPi);
  }

  createTask(model: any) {
    return this.httpClient.post(environment.baseAPi, model);
  }

  deleteTask(id: any) {
    return this.httpClient.delete(environment.baseAPi + id);
  }

  updateTask(model: any, id: any) {
    return this.httpClient.put(environment.baseAPi + id, model);
  }
  getTaskById(id: number) {
    return this.httpClient.get(environment.baseAPi + id);
  }
}
