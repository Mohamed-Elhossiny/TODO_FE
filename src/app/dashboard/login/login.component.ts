import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService
  ) {}

  ngOnInit(): void {
    this.createFrom();
  }

  createFrom() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      role: ['user'],
    });
  }

  get emailField() {
    return this.loginForm.get('email');
  }
  get passwordFiled() {
    return this.loginForm.get('password');
  }

  login() {
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe(
      (res) => {},
      (error) => {}
    );
  }
}
