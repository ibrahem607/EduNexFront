import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse, ISubject } from 'src/app/Model/icourse';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CoursesService } from 'src/app/Services/Courses/courses.service';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.css']
})
export class AddEditCourseComponent implements OnInit {
  courseForm: FormGroup;
  subjects!: ISubject[];
  courseId: number | null = null;
  userId!: string;

  constructor(
    public dialogRef: MatDialogRef<AddEditCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private router: Router,
    private courseData: CoursesService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.userId = this.authService.getUserId();
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      thumbnail: [null, Validators.required],
      price: ['', Validators.required],
      subjectId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);

    this.courseId = this.data.course?.courseID;

    this.getAllSubjects();

    if (this.data.course) {
      this.courseForm.patchValue({
        courseName: this.data.course.courseName,
        thumbnail: this.data.course.thumbnail,
        price: this.data.course.price,
        subjectId: this.data.course.subjectId
      });
    }
  }

  getAllSubjects(): void {
    this.courseData.getAllSubjects().subscribe(
      subjects => {
        this.subjects = subjects.map(subject => {
          return {
            id: subject.id,
            ...subject
          } as ISubject;
        });
      },
      error => {
        console.error('Error fetching subjects:', error);
      }
    );
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
        this.reloadCurrentRoute();
        this.showSnackBar('تم أضافه الكورس بنجاح');
      },
      (error: any) => {
        if (error.status == 200) {
          this.reloadCurrentRoute();
          this.showSnackBar('تم أضافه الكورس بنجاح');
        }
        console.error('Error adding course:', error);
      }
    );
  }

  updateCourse(courseData: any): void {
    const formData = new FormData();
    formData.append('CourseName', courseData.CourseName);
    formData.append('Price', courseData.Price);
    formData.append('SubjectId', courseData.SubjectId);
    formData.append('TeacherId', courseData.TeacherId);

    if (courseData.Thumbnail instanceof File) {
      formData.append('Thumbnail', courseData.Thumbnail);
    }

    console.log(courseData.Thumbnail instanceof File);
    this.courseId &&
      this.courseData.editCourse(this.courseId, formData).subscribe(
        () => {
          console.log('Course updated successfully');
          this.reloadCurrentRoute();
          this.showSnackBar('تم تعديل الكورس بنجاح');
        },
        (error: any) => {
          if (error.status == 200) {
            this.reloadCurrentRoute();
            this.showSnackBar('تم تعديل الكورس بنجاح');
          }
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
      if (this.courseId) {
        this.updateCourse(formData);
      } else {
        this.addCourse(formData);
      }

      this.dialogRef.close(false);
    } else {
      if (this.courseForm.get('thumbnail')?.errors?.['required']) {
        this.showSnackBar('صوره الكورس مطلوبة');
      }
    }
  }

  showSnackBar(message: string): void {
    let panelClass: string[] = [];

    if (message !== 'صوره الكورس مطلوبة') {
      panelClass.push('snackbar-success');
    }

    this.snackBar.open(message, 'حسناً', {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: panelClass
    });
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
