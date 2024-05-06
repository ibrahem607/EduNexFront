import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-student-settings',
  templateUrl: './student-settings.component.html',
  styleUrls: ['./student-settings.component.css']
})
export class StudentSettingsComponent implements OnInit {
  isInputFocused: boolean = false;
  signupForm!: FormGroup;
  student!: any;

  constructor(private studentData: AuthService) { }

  ngOnInit() {
    this.getStudentData(this.studentData.getUserId());
  }

  getStudentData(studentId: string) {
    this.studentData.getStudentData(studentId).subscribe(student => {
      this.student = student;
      console.log(student);
    });
  }

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
