import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from 'src/app/Model/icourse';
import { ITeacher } from 'src/app/Model/iteacher';
import { DynamicDataService } from 'src/app/Services/dynamic-data.service';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent {
  teacher!: ITeacher;
  teacherID: number = 0;
  courses: ICourse[] = [];

  constructor(private activatedRoute: ActivatedRoute, private dynamicData: DynamicDataService) {
    this.teacherID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getTeacherById();
  }

  getTeacherById() {
    this.dynamicData.getTeacherById(this.teacherID).subscribe(teacher => {
      this.teacher = teacher;
      if (teacher) {
        this.getAllCoursesForTeacher(teacher.name);
      }
    });
  }

  getAllCoursesForTeacher(teacherName: string) {
    this.dynamicData.getAllCourses().subscribe(courses => {
      this.courses = courses.filter(course => course.teacher === teacherName);
    });
  }
}
