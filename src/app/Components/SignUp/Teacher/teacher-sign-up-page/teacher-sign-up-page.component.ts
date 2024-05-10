import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-teacher-sign-up-page',
  templateUrl: './teacher-sign-up-page.component.html',
  styleUrls: ['./teacher-sign-up-page.component.css']
})
export class TeacherSignUpPageComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    setTimeout(() => {
      if (this.authService.getUserId()) {
        this.router.navigate(['/']);
        this.openSnackBar('غير متاح او لا يمكن الوصول', 'حسناً');
      }
    }, 0);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
