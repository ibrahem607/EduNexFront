import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { TeacherService } from 'src/app/Services/Auth/teacher.service';

@Component({
  selector: 'app-teacher-settings-form',
  templateUrl: './teacher-settings-form.component.html',
  styleUrls: ['./teacher-settings-form.component.css']
})
export class TeacherSettingsFormComponent {
  isInputFocused: boolean = false;
  updateTeacherForm!: FormGroup;
  errorMeg: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private teacherData: TeacherService,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.updateTeacherForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^(?!\d).{4,}$')]],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      facebookAccount: ['', Validators.required],
    });

    this.getTeacherData(this.authService.getUserId());
  }

  getTeacherData(teacherId: string) {
    this.teacherData.getTeacherById(teacherId).subscribe(teacher => {
      this.setFormValues(teacher)
    });
  }

  get firstName() {
    return this.updateTeacherForm.get('firstName')
  }

  get phoneNumber() {
    return this.updateTeacherForm.get('phoneNumber')
  }

  get facebookAccount() {
    return this.updateTeacherForm.get('facebookAccount')
  }

  get dateOfBirth() {
    return this.updateTeacherForm.get('dateOfBirth')
  }
  get gender() {
    return this.updateTeacherForm.get('gender')
  }

  get city() {
    return this.updateTeacherForm.get('city')
  }

  get address() {
    return this.updateTeacherForm.get('address')
  }

  get confirmPassword() {
    return this.updateTeacherForm.get('confirmPassword')
  }

  get lastName() {
    return this.updateTeacherForm.get('lastName')
  }

  setFormValues(teacher: any) {
    this.updateTeacherForm.patchValue({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      phoneNumber: teacher.phoneNumber,
      dateOfBirth: teacher.dateOfBirth,
      religion: teacher.religion,
      gender: teacher.gender,
      city: teacher.city,
      address: teacher.address,
      facebookAccount: teacher.facebookAccount
    });
  }

  onUpdate(id: string) {
    const formData = this.updateTeacherForm.value;
    const formattedDateOfBirth = this.datePipe.transform(this.updateTeacherForm.value.dateOfBirth, 'yyyy-MM-dd');
    formData.dateOfBirth = formattedDateOfBirth;

    console.log(formData);

    this.teacherData.editTeacher(id, formData).subscribe(
      (response) => {
        console.log(response);
        this.openSnackBar('تم تحديث البيانات', 'حسناَ');
      },
      (error) => {
        if (error.status == 200) {
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
    this.onUpdate(this.authService.getUserId())
  }
}
