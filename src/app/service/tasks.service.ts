import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private httpClient: HttpClient) {}

  getAllTasks(filteration: any) {
    let params = new HttpParams();
    Object.entries(filteration).forEach(([key, value]: any) => {
      if (value) {
        params = params.append(key, value);
      }
    });

    return this.httpClient.get(environment.baseAPi + 'all-tasks', { params });
  }

  createTask(model: any) {
    return this.httpClient.post(environment.baseAPi + 'add-task', model);
  }

  deleteTask(id: any) {
    return this.httpClient.delete(environment.baseAPi + 'delete-task/' + id);
  }

  updateTask(model: any, id: any) {
    return this.httpClient.put(environment.baseAPi + 'edit-task/' + id, model);
  }
}
