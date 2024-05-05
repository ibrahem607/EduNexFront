import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from 'src/app/Model/icourse';
import { ITeacher } from 'src/app/Model/iteacher';
import { CoursesService } from 'src/app/Services/Courses/courses.service';
import { TeachersService } from 'src/app/Services/Teachers/teachers.service';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent {
  teacher!: ITeacher;
  teacherID: string;
  courses: ICourse[] = [];

  constructor(private activatedRoute: ActivatedRoute, private teacherData: TeachersService, private courseData: CoursesService) {
    this.teacherID = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit(): void {
    this.getTeacherById();
  }

  getTeacherById() {
    this.teacherData.getTeacherById(this.teacherID).subscribe(teacher => {
      this.teacher = teacher;
      console.log(teacher)
      if (teacher) {
        this.getAllCoursesForTeacher(teacher.name);
      }
    });
  }

  getAllCoursesForTeacher(teacherName: string) {
    this.courseData.getAllCourses().subscribe(courses => {
      this.courses = courses.filter(course => course.teacherName === teacherName);
    });
  }
}
