import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-student-settings-form',
  templateUrl: './student-settings-form.component.html',
  styleUrls: ['./student-settings-form.component.css']
})
export class StudentSettingsFormComponent {
  isInputFocused: boolean = false;
  signupForm!: FormGroup;
  errorMeg: string = '';

  constructor(private fb: FormBuilder, private studentData: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern('^(?!\d).{4,}$')]],
      lastName: ['', Validators.required],
      studentPhoneNumber: ['', [Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
      fatherPhoneNumber: ['', [Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
      religion: ['', Validators.required],
      birthday: ['', Validators.required],
      sex: ['', Validators.required],
      governorate: ['', Validators.required],
      education: ['', Validators.required],
      address: ['', Validators.required],
    });


    this.getStudentData(this.studentData.getUserId());
  }

  getStudentData(studentId: string) {
    this.studentData.getStudentData(studentId).subscribe(student => {
      console.log(student);
      this.setFormValues(student)
    });
  }

  get password() {
    return this.signupForm.get('password')
  }

  get fullName() {
    return this.signupForm.get('fullName')
  }
  get lastName() {
    return this.signupForm.get('lastName')
  }

  get studentPhoneNumber() {
    return this.signupForm.get('studentPhoneNumber')
  }

  get fatherPhoneNumber() {
    return this.signupForm.get('fatherPhoneNumber')
  }
  get religion() {
    return this.signupForm.get('religion')
  }

  get birthday() {
    return this.signupForm.get('birthday')
  }

  get sex() {
    return this.signupForm.get('sex')
  }
  get education() {
    return this.signupForm.get('education')
  }

  get governorate() {
    return this.signupForm.get('governorate')
  }

  get address() {
    return this.signupForm.get('address')
  }

  setFormValues(student: any) {
    console.log(this.signupForm)
    this.signupForm.patchValue({
      fullName: student.firstName,
      lastName: student.lastName,
      studentPhoneNumber: student.phoneNumber,
      fatherPhoneNumber: student.parentPhoneNumber,
      birthday: student.dateOfBirth,
      religion: student.religion,
      sex: student.gender,
      governorate: student.city,
      address: student.address,
      education: student.levelId.toString(),
    });
  }

  onSubmit() {

  }
}
