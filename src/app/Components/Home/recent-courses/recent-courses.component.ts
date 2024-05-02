import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/Model/icourse';
import { trigger, style, transition, animate } from '@angular/animations';
import { CoursesService } from 'src/app/Services/Courses/courses.service';

@Component({
  selector: 'app-recent-courses',
  templateUrl: './recent-courses.component.html',
  styleUrls: ['./recent-courses.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-200%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
    ])
  ]
})
export class RecentCoursesComponent implements OnInit {
  courses: ICourse[] = [];
  filteredCourses: ICourse[] = [];
  subjectName: string[] = [];

  options: { subjectName: string; selected: boolean; }[] = [];

  currentIndex = 0;
  cardsToShow = 18;

  constructor(private courseData: CoursesService) { }

  toggleOption(index: number) {
    this.options.forEach((option, i) => {
      option.selected = i === index;
    });
    this.currentIndex = 0;
    this.filterCourses();
  }

  filterCourses() {
    const selectedOption = this.options.find(option => option.selected);

    if (selectedOption) {
      const selectedSubjectName = selectedOption.subjectName;
      this.filteredCourses = this.courses.filter(course => course.subjectName === selectedSubjectName);
    }
  }

  getAll() {
    this.courseData.getAllCourses().subscribe(courses => {
      this.courses = courses;
      this.filterCourses();
    });
  }

  ngOnInit(): void {
    this.getAll();

    this.courseData.getAllCourses().subscribe(courses => {
      this.subjectName = courses.map(course => course.subjectName);
      this.options = this.subjectName.map((subject, index) => ({ subjectName: subject, selected: index === 0 }));

      this.toggleOption(0);
    });
  }
}
