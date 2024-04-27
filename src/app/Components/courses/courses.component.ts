// courses.component.ts
import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/Model/icourse';

import { DynamicDataService } from 'src/app/Services/dynamic-data.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  panelOpenState = false;

  courses: ICourse[] = [];

  constructor(private dynamicData: DynamicDataService) { }

  getAllCourses() {
    this.dynamicData.getAllCourses().subscribe(courses => this.courses = courses);
  }

  ngOnInit(): void {
    this.getAllCourses()
  }

}
