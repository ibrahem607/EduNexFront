import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUserUpdateFormData } from 'src/app/Model/iuserUpdateForm';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { passwordMatched } from 'src/app/Validator/CrossfiledValidation';

@Component({
  selector: 'app-student-sign-up-form',
  templateUrl: './student-sign-up-form.component.html',
  styleUrls: ['./student-sign-up-form.component.css']
})
export class StudentSignUpFormComponent implements OnInit, OnChanges {
  @Input() student: any = null;
  isInputFocused: boolean = false;
  signupForm!: FormGroup;
  errorMeg: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

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
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['',],
      studentEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      rebot: [false, Validators.required],
      rebot2: [false, Validators.required]
    }, { validators: passwordMatched });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student'] && changes['student'].currentValue) {
      console.log(this.student);
      this.setFormValues(changes['student'].currentValue);
    }
  }

  get password() {
    return this.signupForm.get('password')
  }

  get studentEmail() {
    return this.signupForm.get('studentEmail')
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

  get confirmPassword() {
    return this.signupForm.get('confirmPassword')
  }
  get rebot() {
    return this.signupForm.get('rebot')
  }

  get rebot2() {
    return this.signupForm.get('rebot2')
  }

  isPasswordInvalid() {
    return this.password?.invalid && (this.password?.dirty || this.password?.touched);
  }

  passwordStrengthValidator(control: any) {
    // Password strength
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (control.value && !regex.test(control.value)) {
      return { 'weakPassword': true };
    }

    return null;
  }

  setFormValues(student: any) {
    this.signupForm.patchValue({
      fullName: `${student.firstName} ${student.lastName}`,
      studentEmail: student.email,
      studentPhoneNumber: student.s,
      fatherPhoneNumber: student.parentPhoneNumber,
      religion: student.religion,
      birthday: new Date(student.birthday),
      sex: student.gender,
      governorate: student.governorate,
      education: student.levelName,
      address: student.address,
      password: '',
      confirmPassword: '',
      rebot: false,
      rebot2: false
    });
  }

  onSubmit() {

    if (this.signupForm.valid) {

      const defaultFormData: IUserUpdateFormData = {
        City: this.signupForm.value.governorate,
        address: this.signupForm.value.address,
        confirmPassword: this.signupForm.value.confirmPassword,
        dateOfBirth: this.signupForm.value.birthday,
        Email: this.signupForm.value.studentEmail,
        FirstName: this.signupForm.value.fullName,
        gender: this.signupForm.value.sex,
        lastName: this.signupForm.value.lastName,
        ParentPhoneNumber: this.signupForm.value.fatherPhoneNumber,
        Password: this.signupForm.value.password,
        PhoneNumber: this.signupForm.value.studentPhoneNumber,
        religion: this.signupForm.value.religion,
        levelId: this.signupForm.value.education,
      };

      // Save data in DB
      this.authService.signUp(defaultFormData).subscribe(
        {
          next: (data) => {
            console.log(data)
            if (data.token) {
              this.authService.signUp(this.signupForm.value);
              //go to login
              this.router.navigate(['/login'])
              this._snackBar.open('تم انشاء الحساب بنجاح', 'Close', {
                duration: 5000,
                verticalPosition: 'top',
              });
            }
          },
          error: (err) => {
            this.errorMeg = err.error.errors.msg;
            console.log(err);
          }
        })
    } else {

      Object.keys(this.signupForm.controls).forEach(controlName => {
        this.signupForm.get(controlName)?.markAsTouched();
      });

    }
  }
}
