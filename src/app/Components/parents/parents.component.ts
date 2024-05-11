import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParentsService } from 'src/app/Services/Parents/parents.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {
  changePasswordForm!: FormGroup;
  studentData!: any;
  loading = false;
  studentName!: string;

  options = [
    { label: 'الكورس', selected: true },
    { label: 'الامتحانات', selected: false },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private parentsData: ParentsService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      studentNationalId: ['', [Validators.required, Validators.pattern(/^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$/)]]
    });
  }

  onSubmit() {
    const nationalId = this.changePasswordForm.get('studentNationalId')?.value;
    this.loading = true;
    this.parentsData.getParents(nationalId).subscribe(
      data => {
        this.studentData = data;
        this.loading = false;
        console.log(this.studentData)
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  get studentNationalId() {
    return this.changePasswordForm.get('studentNationalId');
  }

  toggleOption(index: number) {
    this.options.forEach((option, i) => {
      option.selected = i === index;
    });
  }
}
