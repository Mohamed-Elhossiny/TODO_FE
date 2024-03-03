import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private service: LoginService,
    private toaster: ToastrService,
    private router: Router
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
    this.service.login(this.loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.toaster.success('Login Success', 'Success');
        this.router.navigate(['/tasks']);
      },
      (error) => {
        this.toaster.error(error.error.message);
      }
    );
  }
}
