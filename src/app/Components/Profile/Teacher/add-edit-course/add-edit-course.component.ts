import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from 'src/app/Model/icourse';
import { CoursesService } from 'src/app/Services/Courses/courses.service';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.css']
})
export class AddEditCourseComponent implements OnInit {
  courseForm: FormGroup;
  courseId: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddEditCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private courseData: CoursesService
  ) {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      thumbnail: ['', Validators.required],
      courseType: ['', Validators.required],
      price: ['', Validators.required],
      subjectName: ['', Validators.required],
      teacherName: ['', Validators.required],
      levelName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.courseId = this.data.courseId;
  }

  onSubmit() {
    console.log(this.courseForm)
    if (this.courseForm.valid) {
      const formData = this.getCourseData();
      console.log(this.courseId)
      if (this.courseId !== null) {
        this.updateCourse(formData);
      } else {
        this.addCourse(formData);
      }
    }
  }

  getCourseData(): ICourse {
    const formData = this.courseForm.value as ICourse;
    if (this.courseId !== null) {
      formData.id = this.courseId;
    }
    return formData;
  }

  addCourse(courseData: ICourse): void {
    this.courseData.addCourse(courseData)
      .subscribe(
        (newCourse: ICourse) => {
          console.log('Course added:', newCourse);
        },
        (error: any) => {
          console.error('Error adding course:', error);
        }
      );
  }

  updateCourse(courseData: ICourse): void {
    if (this.courseId !== null) {
      this.courseData.editCourse(this.courseId, courseData)
        .subscribe(
          () => {
            console.log('Course updated successfully');
          },
          (error: any) => {
            console.error('Error updating course:', error);
          }
        );
    }
  }

  onFileSelected(file: File) {
    if (file) {
      this.courseForm.patchValue({ thumbnail: file, teacherName: "ahmed" });
    }
  }

  resetForm() {
    this.courseForm.reset();
  }
}
