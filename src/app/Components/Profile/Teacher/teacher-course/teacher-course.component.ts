import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-course',
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.css']
})
export class TeacherCourseComponent {
  displayedColumns: string[] = ['CourseName', 'Price', 'PurchaseTimes', 'Actions'];
  dataSource = ELEMENT_DATA;
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
