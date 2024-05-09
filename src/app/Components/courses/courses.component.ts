import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/Model/icourse';
import { CoursesService } from 'src/app/Services/Courses/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  panelOpenState = false;

  subject: string = 'all';
  type: string = 'all';
  level: string = 'all';

  page: number = 1;
  itemsPerPage: number = 6;
  filteredCourses: ICourse[] = [];
  filteredPaginatedCourses: ICourse[] = [];

  courses: ICourse[] = [];

  subjectName: string[] = [];
  courseType: string[] = [];
  levelName: string[] = [];
  price: number[] = [];

  minPrice: number = 0;
  maxPrice: number = 0;
  middlePrice: number = 0;

  constructor(private courseData: CoursesService) { }

  getAllCourses() {
    this.courseData.getAllCourses().subscribe(courses => {
      this.courses = courses;
      this.filteredCourses = courses;
      this.extractProperties()
      this.updateFilteredPaginatedCourses();
    });
  }

  extractProperties() {
    // Extract properties from courses array
    this.courses.forEach(course => {
      if (!this.subjectName.includes(course.subjectName)) {
        this.subjectName.push(course.subjectName);
      }

      if (!this.courseType.includes(course.courseType)) {
        this.courseType.push(course.courseType);
      }

      if (!this.levelName.includes(course.levelName)) {
        this.levelName.push(course.levelName);
      }

      if (!this.price.includes(course.price)) {
        this.price.push(course.price);
      }
    });

    this.minPrice = Math.min(...this.price);
    this.maxPrice = Math.max(...this.price);
    this.middlePrice = this.calculateMiddlePrice(this.price);
  }

  calculateMiddlePrice(prices: number[]): number {
    const sortedPrices = prices.sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedPrices.length / 2);
    return sortedPrices[middleIndex];
  }

  filterBySubject() {
    if (this.subject === 'all') {
      this.filteredCourses = this.courses;
    } else {
      this.filteredCourses = this.courses.filter(course => course.subjectName === this.subject);
    }
    this.updateFilteredPaginatedCourses();
  }

  filterByCourseType() {
    if (this.type === 'all') {
      this.filteredCourses = this.courses;
    } else {
      this.filteredCourses = this.courses.filter(course => course.courseType === this.type);
    }
    this.updateFilteredPaginatedCourses();
  }

  filterByLevel() {
    if (this.level === 'all') {
      this.filteredCourses = this.courses;
    } else {
      this.filteredCourses = this.courses.filter(course => course.levelName === this.level);
    }
    this.updateFilteredPaginatedCourses();
  }

  filterByPriceRange(maxPrice: any) {
    // console.log(maxPrice.endValueIndicatorText)
    this.filteredCourses = this.courses.filter(course => course.price <= maxPrice.endValueIndicatorText);
    this.updateFilteredPaginatedCourses();
  }

  updateFilteredPaginatedCourses() {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    if (this.filteredCourses.length > this.itemsPerPage) {
      this.filteredPaginatedCourses = this.filteredCourses.slice(startIndex, endIndex);
    } else {
      this.filteredPaginatedCourses = this.filteredCourses;
    }
    this.page = 1;
  }

  ngOnInit(): void {
    this.getAllCourses();
  }

  onPageChange(pageNumber: number) {
    this.page = pageNumber;
    this.updateFilteredPaginatedCourses();
  }
}
