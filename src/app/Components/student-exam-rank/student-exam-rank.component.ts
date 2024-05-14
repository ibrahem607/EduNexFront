import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExamService } from 'src/app/Services/Exam/exam.service';

@Component({
  selector: 'app-student-exam-rank',
  templateUrl: './student-exam-rank.component.html',
  styleUrls: ['./student-exam-rank.component.css']
})
export class StudentExamRankComponent implements OnInit {
  rankData: any[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['rank', 'studentName', 'score']; // Added 'rank' to displayed columns

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private examData: ExamService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.rankData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getCourseById();
  }

  getCourseById() {
    this.examData.GetStudentsOrderedByScore().subscribe(rankData => {
      this.rankData = rankData.map((item: any, index: number) => ({ ...item, rank: index + 1 }));
      this.dataSource.data = this.rankData;
    });
  }
}
