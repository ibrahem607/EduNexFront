import { Component } from '@angular/core';
import { ITeacher } from 'src/app/Model/iteacher';
import { TeachersService } from 'src/app/Services/Teachers/teachers.service';

@Component({
  selector: 'app-about-teachers',
  templateUrl: './about-teachers.component.html',
  styleUrls: ['./about-teachers.component.css']
})
export class AboutTeachersComponent {
  teachers: ITeacher[] = [];

  constructor(private teacherData: TeachersService) { }

  getAll() {
    this.teacherData.getAllTeachers().subscribe(teachers => this.teachers = teachers);
  }
  ngOnInit(): void {
    this.getAll()
  }

}
