import { DatePipe } from '@angular/common';
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
  updateStudentForm!: FormGroup;
  errorMeg: string = '';

  constructor(
    private fb: FormBuilder,
    private studentData: AuthService,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.updateStudentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^(?!\d).{4,}$')]],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
      parentPhoneNumber: ['', [Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
      religion: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      levelId: ['', Validators.required],
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
    return this.updateStudentForm.get('password')
  }

  get firstName() {
    return this.updateStudentForm.get('firstName')
  }
  get lastName() {
    return this.updateStudentForm.get('lastName')
  }

  get phoneNumber() {
    return this.updateStudentForm.get('phoneNumber')
  }

  get parentPhoneNumber() {
    return this.updateStudentForm.get('parentPhoneNumber')
  }
  get religion() {
    return this.updateStudentForm.get('religion')
  }

  get dateOfBirth() {
    return this.updateStudentForm.get('dateOfBirth')
  }

  get gender() {
    return this.updateStudentForm.get('gender')
  }
  get levelId() {
    return this.updateStudentForm.get('levelId')
  }

  get city() {
    return this.updateStudentForm.get('city')
  }

  get address() {
    return this.updateStudentForm.get('address')
  }

  setFormValues(student: any) {
    console.log(this.updateStudentForm)
    this.updateStudentForm.patchValue({
      firstName: student.firstName,
      lastName: student.lastName,
      phoneNumber: student.phoneNumber,
      parentPhoneNumber: student.parentPhoneNumber,
      birthDate: student.dateOfBirth,
      religion: student.religion,
      gender: student.gender,
      city: student.city,
      address: student.address,
      levelId: student.levelId.toString(),
    });
  }

  onUpdate(id: string) {
    const formData = this.updateStudentForm.value;
    const formattedDateOfBirth = this.datePipe.transform(this.updateStudentForm.value.birthDate, 'yyyy-MM-dd');
    formData.birthDate = formattedDateOfBirth;

    this.studentData.editStudent(id, formData).subscribe(
      (response) => {
        console.log(response);
        this.openSnackBar('تم تحديث البيانات', 'حسناَ');
      },
      (error) => {
        if(error.status == 200){
          this.openSnackBar('تم تحديث البيانات', 'حسناَ');
        }
        console.error(error);
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: 'snackbar-success'
    });
  }

  onSubmit() {
    this.onUpdate(this.studentData.getUserId());
  }
}
