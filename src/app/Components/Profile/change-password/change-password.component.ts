import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatched } from 'src/app/Validator/CrossfiledValidation';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatched });
  }


  onSubmit() {
    if (this.changePasswordForm.valid) {
      console.log('Form submitted successfully!');
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
