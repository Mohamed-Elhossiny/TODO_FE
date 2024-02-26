import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../Models/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl: string = 'https://crud-107i.onrender.com/';
  constructor(private httpClient: HttpClient) {}

  login(Model: Login) {
    return this.httpClient.post(this.baseUrl + 'auth/login', Model);
  }
}
