import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatched } from 'src/app/Validator/CrossfiledValidation';

@Component({
  selector: 'app-student-settings',
  templateUrl: './student-settings.component.html',
  styleUrls: ['./student-settings.component.css']
})
export class StudentSettingsComponent {
  isInputFocused: boolean = false;
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern('^(?!\d).{8,}$')]],
      studentPhoneNumber: ['', [Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
      fatherPhoneNumber: ['', [Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
      Religion: ['', Validators.required],
      birthday: ['', Validators.required],
      Sex: ['', Validators.required],
      Governorate: ['', Validators.required],
      education: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['',],
      Rebot: [false, Validators.required],
      Rebot2: [false, Validators.required]
    }, { validators: passwordMatched }); // Apply custom validator here
  }

  get fullName() {
    return this.signupForm.get('fullName')
  }
  get studentPhoneNumber() {
    return this.signupForm.get('studentPhoneNumber')
  }
  get fatherPhoneNumber() {
    return this.signupForm.get('fatherPhoneNumber')
  }
  get Religion() {
    return this.signupForm.get('Religion')
  }
  get birthday() {
    return this.signupForm.get('birthday')
  }
  get Sex() {
    return this.signupForm.get('Sex')
  }
  get education() {
    return this.signupForm.get('education')
  }
  get Governorate() {
    return this.signupForm.get('Governorate')
  }
  get address() {
    return this.signupForm.get('address')
  }
  get password() {
    return this.signupForm.get('password')
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword')
  }
  get Rebot() {
    return this.signupForm.get('Rebot')
  }
  get Rebot2() {
    return this.signupForm.get('Rebot2')
  }


  // onInputFocus() {
  //   this.isInputFocused = true;
  // }

  // onInputBlur() {
  //   this.isInputFocused = false;
  // }

  onSubmit() {
    if (this.signupForm.valid) {
      // Save data in DB
      console.log(this.signupForm.value);
    } else {
      this.signupForm.markAllAsTouched();
      console.log("errorrrrr404");

    }
  }
}
