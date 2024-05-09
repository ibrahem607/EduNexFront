import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { ActivatedRoute } from '@angular/router';
import { ICourse } from 'src/app/Model/icourse';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CoursesService } from 'src/app/Services/Courses/courses.service';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.css']
})
export class AddEditCourseComponent implements OnInit {
  courseForm: FormGroup;
  courseId: number | null = null;
  userId!: string;

  constructor(
    public dialogRef: MatDialogRef<AddEditCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private courseData: CoursesService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.userId = this.authService.getUserId();
    // console.log( this.userId)
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      thumbnail: [null, Validators.required],
      price: ['', Validators.required],
      subjectId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.courseId = this.data.courseId;
  }

  getCourseData(): any {
    const formData = this.courseForm.value;
    const courseData: any = {
      CourseName: formData.courseName,
      Thumbnail: formData.thumbnail,
      Price: formData.price,
      SubjectId: formData.subjectId,
      TeacherId: this.userId
    };

    if (this.courseId) {
      courseData.id = this.courseId;
    }

    return courseData;
  }

  addCourse(courseData: any): void {
    const formData = new FormData();
    formData.append('CourseName', courseData.CourseName);
    formData.append('Thumbnail', courseData.Thumbnail);
    formData.append('Price', courseData.Price);
    formData.append('SubjectId', courseData.SubjectId);
    formData.append('TeacherId', courseData.TeacherId);

    this.courseData.addCourse(formData).subscribe(
      (newCourse: ICourse) => {
        console.log('Course added:', newCourse);
      },
      (error: any) => {
        console.error('Error adding course:', error);
      }
    );
  }


  updateCourse(courseData: any): void {
    const formData = new FormData();
    formData.append('CourseName', courseData.CourseName);
    formData.append('Thumbnail', courseData.Thumbnail);
    formData.append('Price', courseData.Price);
    formData.append('SubjectId', courseData.SubjectId);
    formData.append('TeacherId', courseData.TeacherId);

    this.courseId &&
      this.courseData.editCourse(this.courseId, formData).subscribe(
        () => {
          console.log('Course updated successfully');
        },
        (error: any) => {
          console.error('Error updating course:', error);
        }
      );
  }


  onFileSelected(file: File) {
    if (file) {
      this.courseForm.patchValue({ thumbnail: file });
    }
  }

  onImageDeleted() {
    this.courseForm.patchValue({ thumbnail: null });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {

    if (this.courseForm.valid) {
      const formData = this.getCourseData();
      // console.log(formData)
      if (this.courseId !== null) {
        this.addCourse(formData);
      } else {
        this.addCourse(formData);
      }
    } else {
      if (this.courseForm.get('thumbnail')?.errors?.['required']) {
        this.showSnackBar('صوره الكورس مطلوبة');
      }
    }
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'حسناً', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
