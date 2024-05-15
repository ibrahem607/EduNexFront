import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ITeacher } from 'src/app/Model/iteacher';
import { TeachersService } from 'src/app/Services/Teachers/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  panelOpenState = false;
  teachers: ITeacher[] = [];
  filteredTeachers: ITeacher[] = [];
  searchTerm: string = '';
  page: number = 1;
  itemsPerPage: number = 6;
  filteredPaginatedTeachers: ITeacher[] = [];
  subjects: string[] = [];
  subject!: string;

  constructor(
    private teacherData: TeachersService,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);

    this.getAll();
  }

  getAll() {
    this.teacherData.getAllTeachers().subscribe(teachers => {
      this.teachers = teachers;
      this.filterTeachers();
      // console.log(teachers)
    });
  }

  filterTeachers() {
    const searchTerms = this.searchTerm.trim().toLowerCase().split(/\s+/);

    this.filteredTeachers = this.teachers.filter(teacher => {
      let match = true;
      for (const term of searchTerms) {
        if (
          !teacher.firstName.toLowerCase().includes(term) &&
          !teacher.lastName.toLowerCase().includes(term)
        ) {
          match = false;
          break;
        }
      }
      return match;
    }).filter(teacher => {
      if (!this.subject || this.subject === 'all') {
        return true;
      } else {
        return teacher.subject === this.subject;
      }
    });

    this.PaginateFilteredTeachers();
  }

  PaginateFilteredTeachers() {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    if (this.filteredTeachers.length > this.itemsPerPage) {
      this.filteredPaginatedTeachers = this.filteredTeachers.slice(startIndex, endIndex);
    } else {
      this.filteredPaginatedTeachers = this.filteredTeachers;
    }
  }

  onPageChange(pageNumber: number) {
    this.page = pageNumber;
    this.filterTeachers();
  }

  extractUniqueSubjects(teachers: ITeacher[]): string[] {
    const uniqueSubjects: string[] = [];
    for (let i = 0; i < teachers.length; i++) {

      if (!uniqueSubjects.includes(teachers[i].subject)) {
        uniqueSubjects.push(teachers[i].subject);
      }
    }
    return uniqueSubjects;
  }
}
