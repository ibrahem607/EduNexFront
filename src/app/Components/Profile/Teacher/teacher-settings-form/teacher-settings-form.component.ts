import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { TeacherService } from 'src/app/Services/Auth/teacher.service';

@Component({
  selector: 'app-teacher-settings-form',
  templateUrl: './teacher-settings-form.component.html',
  styleUrls: ['./teacher-settings-form.component.css']
})
export class TeacherSettingsFormComponent {
  isInputFocused: boolean = false;
  signupForm!: FormGroup;
  errorMeg: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private teacherData: TeacherService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern('^(?!\d).{4,}$')]],
      lastName: ['', Validators.required],
      teacherPhoneNumber: ['', [Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
      birthday: ['', Validators.required],
      sex: ['', Validators.required],
      governorate: ['', Validators.required],
      address: ['', Validators.required],
      FacebookAccount: ['', Validators.required],
    });

    this.getTeacherData(this.authService.getUserId());
  }

  getTeacherData(teacherId: string) {
    this.teacherData.getTeacherById(teacherId).subscribe(teacher => {
      console.log(teacher);
      this.setFormValues(teacher)
    });
  }

  get fullName() {
    return this.signupForm.get('fullName')
  }

  get teacherPhoneNumber() {
    return this.signupForm.get('teacherPhoneNumber')
  }

  get FacebookAccount() {
    return this.signupForm.get('FacebookAccount')
  }

  get birthday() {
    return this.signupForm.get('birthday')
  }
  get sex() {
    return this.signupForm.get('sex')
  }

  get governorate() {
    return this.signupForm.get('governorate')
  }

  get address() {
    return this.signupForm.get('address')
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword')
  }

  get lastName() {
    return this.signupForm.get('lastName')
  }

  setFormValues(teacher: any) {
    console.log(this.signupForm)
    this.signupForm.patchValue({
      fullName: teacher.firstName,
      lastName: teacher.lastName,
      teacherPhoneNumber: teacher.phoneNumber,
      birthday: teacher.dateOfBirth,
      religion: teacher.religion,
      sex: teacher.gender,
      governorate: teacher.city,
      address: teacher.address,
      FacebookAccount:teacher.facebookAccount

    });
  }

  onSubmit() {
  }
}
