import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.css']
})
export class AddEditCourseComponent implements OnInit {
  courseForm: FormGroup;
  courseId: number | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.courseForm = this.fb.group({
      id: [],
      courseName: ['', Validators.required],
      thumbnail: [''],
      courseType: ['', Validators.required],
      price: ['', Validators.required],
      subjectName: ['', Validators.required],
      teacherName: ['', Validators.required],
      profilePhoto: [''],
      levelName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Convert to number
      if (!isNaN(id)) {
        this.courseId = id;
        // Fetch course details based on courseId if needed
        // Here you can make an HTTP request to fetch the course details
      } else {
        this.courseId = null;
      }
    });
  }

  onSubmit() {
    // Process the form submission
    if (this.courseForm.valid) {
      const formData = this.courseForm.value;
      // Perform create or update operation here
      console.log(formData);
    } else {
      // Form is invalid, handle accordingly
    }
  }

  resetForm() {
    this.courseForm.reset();
  }
}
