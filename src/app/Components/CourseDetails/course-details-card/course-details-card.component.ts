import { Component, Input, OnInit } from '@angular/core';
import { ICourse } from 'src/app/Model/icourse';
import { MatDialog } from '@angular/material/dialog';
import { EnrollDialogComponent } from '../Dialog/enroll-dialog/enroll-dialog.component';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { CoursesService } from 'src/app/Services/Courses/courses.service';

@Component({
  selector: 'app-course-details-card',
  templateUrl: './course-details-card.component.html',
  styleUrls: ['./course-details-card.component.css'],
})
export class CourseDetailsCardComponent implements OnInit {
  @Input() course: ICourse | null = null;
  isEnrolled!: boolean;
  role!: string;
  userId: string;

  constructor(public dialog: MatDialog, private authService: AuthService, private courseData: CoursesService) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    this.checkEnrollment();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EnrollDialogComponent, {
      height: '200px',
      width: '400px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        title: 'هل أنت متأكد؟',
        message: 'سيتم الاشتراك الآن',
        buttonText: 'اشترك الآن',
        courseId: this.course?.id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  checkEnrollment() {
    this.course &&
      this.courseData.checkEnrollment(this.course.id, this.userId).subscribe(isEnrolled => {
        this.isEnrolled = isEnrolled;
      });
  }

  isStudentAllowed() {
    return this.role === 'Student' && this.isEnrolled;
  }
}
