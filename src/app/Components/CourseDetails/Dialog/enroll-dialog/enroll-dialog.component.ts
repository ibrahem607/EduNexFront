import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CoursesService } from 'src/app/Services/Courses/courses.service';

@Component({
  selector: 'app-enroll-dialog',
  templateUrl: './enroll-dialog.component.html',
  styleUrls: ['./enroll-dialog.component.css']
})
export class EnrollDialogComponent {
  balance: boolean = true;
  userId: string;

  constructor(
    public dialogRef: MatDialogRef<EnrollDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private courseData: CoursesService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.userId = this.authService.getUserId();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.courseEnroll();
    this.dialogRef.close();
  }

  courseEnroll() {
    const studentCourse = {
      "studentId": this.userId,
      "courseId": this.data.courseId
    }

    if (this.balance) {
      this.courseData.courseEnroll(studentCourse).subscribe(
        () => {
          console.log(`Enrolled successfully`);
          this.openSnackBar('لقد اشتركت في الكورس بنجاح');
          this.reloadCurrentRoute();
        },
        (error) => {
          if (error.status == 200) {
            this.openSnackBar('لقد اشتركت في الكورس بنجاح');
            this.reloadCurrentRoute();
          } else {
            this.openSnackBar('لا يوجد رصيد كافي في محفظتك');
          }
          console.error(`Failed to enroll:`, error);
        }
      );
    } else {
      this.openSnackBar('لا يوجد رصيد كافي في محفظتك');
    }
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  openSnackBar(message: string) {
    const panelClass = message === 'لقد اشتركت في الكورس بنجاح' ? ['snackbar-success'] : [];

    this.snackBar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: panelClass
    });
  }
}
