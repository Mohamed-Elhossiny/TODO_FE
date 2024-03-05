import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateAccount } from 'src/app/Models/login';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private toaster: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.createFrom();
  }

  createFrom() {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        userName: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        role: ['user'],
      },
      { validators: this.checkPassword }
    );
  }

  get emailField() {
    return this.registerForm.get('email');
  }

  get userNameFeild() {
    return this.registerForm.get('userName');
  }

  get passwordFeild() {
    return this.registerForm.get('password');
  }

  get confirmPasswordFeild() {
    return this.registerForm.get('confirmPassword');
  }

  createAccount() {
    const MODEL: CreateAccount = {
      email: this.registerForm.get('email')?.value,
      username: this.registerForm.get('userName')?.value,
      password: this.registerForm.get('password')?.value,
      role: this.registerForm.get('role')?.value,
    };

    this.service.createAccount(MODEL).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.toaster.success('Success', 'Account Created Successfully');
        this.router.navigate(['/tasks']);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  checkPassword: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let password = group.get('password')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatched: true };
  };
}
