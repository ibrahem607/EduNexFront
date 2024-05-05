import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/Components/CourseDetails/Dialog/confirmation-dialog/confirmation-dialog.component';
import { AddEditCourseComponent } from '../add-edit-course/add-edit-course.component';

@Component({
  selector: 'app-teacher-course',
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.css']
})
export class TeacherCourseComponent {
  displayedColumns: string[] = ['CourseName', 'Price', 'PurchaseTimes', 'Actions'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) { }

  openDeleteCourseConfirmationDialog(courseID: number): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: 'هل أنت متأكد أنك تريد حذف الكورس؟',
        confirmButtonText: 'حذف الكورس',
        courseId: courseID,
        deleteType: "course"
      }
    });
  }

  openAddEditCourseConfirmationDialog(courseID?: number): void {
    this.dialog.open(AddEditCourseComponent, {
      data: {
        message: 'هل أنت متأكد أنك تريد حذف الكورس؟',
        confirmButtonText: courseID ? 'تعديل الكورس' : 'اضافه كورس',
        courseId: courseID,
      }
    });
  }
}

export interface PeriodicElement {
  courseName: string;
  price: number;
  purchaseTimes: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { courseName: 'الرياضيات', price: 100, purchaseTimes: 21 },
  { courseName: 'الفيزياء', price: 120, purchaseTimes: 20 },
  { courseName: 'الرياضيات 2', price: 150, purchaseTimes: 50 },
  { courseName: 'ميكانيكا الكم', price: 200, purchaseTimes: 73 }
];
