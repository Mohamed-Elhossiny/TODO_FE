import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateAccount, Login } from '../Models/login';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  login(Model: Login) {
    return this.httpClient.post(
      environment.baseAPi.replace('tasks/', 'auth/') + 'login',
      Model
    );
  }

  createAccount(model: CreateAccount) {
    return this.httpClient.post(
      environment.baseAPi.replace('tasks/', 'auth/') + 'createAccount',
      model
    );
  }
}
