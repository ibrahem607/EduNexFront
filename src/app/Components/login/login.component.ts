import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isInputFocused: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      studentEmail: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          ),
        ],
      ],
      password: ['', Validators.required],
    });

    setTimeout(() => {
      if (this.authService.getUserId()) {
        this.router.navigate(['/']);
        this.openSnackBar('غير متاح او لا يمكن الوصول', 'حسناً');
      }
    }, 0);
  }

  get studentEmail() {
    return this.loginForm.get('studentEmail');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    type DefaultFormData = {
      email: string;
      password: string;
    };
    const defaultFormData: DefaultFormData = {
      email: this.loginForm.value.studentEmail,
      password: this.loginForm.value.password,
    };

    if (this.loginForm.valid) {
      this.authService.login(defaultFormData).subscribe({
        next: (data) => {
          // Handle success
          console.log(`success ${data.token}`);
        },
        error: (err) => {
          // Handle error
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
