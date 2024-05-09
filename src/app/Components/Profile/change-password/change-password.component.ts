import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { passwordMatched } from 'src/app/Validator/CrossfiledValidation';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatched });
  }

  onSubmit() {
    const passwords = {
      "currentPassword": `${this.changePasswordForm.value.currentPassword}`,
      "newPassword": `${this.changePasswordForm.value.password}`
    }

    if (this.changePasswordForm.valid) {
      this.authService.changePassword(this.authService.getUserId(), passwords).subscribe(
        () => {
          console.log('Password Changed successful');
          this.reloadCurrentRoute();
        },
        error => {
          console.error('Password Changing failed:', error);
        }
      );
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
