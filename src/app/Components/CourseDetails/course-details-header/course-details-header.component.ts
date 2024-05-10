import { Component, Input, OnInit } from '@angular/core';
import { ICourse } from 'src/app/Model/icourse';
import { CoursesService } from 'src/app/Services/Courses/courses.service';

@Component({
  selector: 'app-course-details-header',
  templateUrl: './course-details-header.component.html',
  styleUrls: ['./course-details-header.component.css']
})
export class CourseDetailsHeaderComponent implements OnInit {
  @Input() course: ICourse | null = null;
  lecturesCount!: number;
  studentsCount!: number;

  constructor(private courseData: CoursesService) { }

  ngOnInit(): void {
    this.getCounts();
  }

  getCounts() {
    if (this.course) {
      this.courseData.getCountLectures(this.course.id).subscribe(count => {
        this.lecturesCount = count;
      });

      this.courseData.getCountStudents(this.course.id).subscribe(count => {
        this.studentsCount = count;
      });
    }
  }
}
