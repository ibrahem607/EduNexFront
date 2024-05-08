import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-student-settings',
  templateUrl: './student-settings.component.html',
  styleUrls: ['./student-settings.component.css']
})
export class StudentSettingsComponent {
  isInputFocused: boolean = false;
  signupForm!: FormGroup;

  constructor(private studentData: AuthService) { }

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
