import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CountsService } from 'src/app/Services/Counts/counts.service';

@Component({
  selector: 'app-target-counter',
  templateUrl: './target-counter.component.html',
  styleUrls: ['./target-counter.component.css']
})
export class TargetCounterComponent implements OnInit {
  @ViewChild('teacherCounter', { static: true }) teacherCounter!: ElementRef;
  @ViewChild('courseCounter', { static: true }) courseCounter!: ElementRef;
  @ViewChild('studyHourCounter', { static: true }) studyHourCounter!: ElementRef;
  @ViewChild('studentCounter', { static: true }) studentCounter!: ElementRef;

  teacherFinalNumber!: number;
  courseFinalNumber = 70;
  studyHourFinalNumber = 90;
  studentFinalNumber!: number;

  constructor(private countData: CountsService) { }

  ngOnInit(): void {
    this.observeCounters();
    this.getCountAllTeachers();
    this.getCountAllStudents();
  }

  observeCounters() {
    this.observeCounter(this.teacherCounter.nativeElement, this.teacherFinalNumber);
    this.observeCounter(this.courseCounter.nativeElement, this.courseFinalNumber);
    this.observeCounter(this.studyHourCounter.nativeElement, this.studyHourFinalNumber);
    this.observeCounter(this.studentCounter.nativeElement, this.studentFinalNumber);
  }

  getCountAllTeachers() {
    this.countData.getCountAllTeachers().subscribe(teacherFinalNumber => {
      this.teacherFinalNumber = teacherFinalNumber['count'];
      this.observeCounters();
    });
  }

  getCountAllStudents() {
    this.countData.getCountAllStudents().subscribe(studentFinalNumber => {
      this.studentFinalNumber = studentFinalNumber['count'];
      this.observeCounters();
    });
  }

  observeCounter(element: HTMLElement, finalNumber: number) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.incrementCounter(element, finalNumber);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(element);
  }

  incrementCounter(element: HTMLElement, finalNumber: number) {
    let count = 0;
    const interval = setInterval(() => {
      if (count < finalNumber) {
        count++;
        element.textContent = count.toString();
      } else {
        clearInterval(interval);
      }
    }, 10);
  }
}
