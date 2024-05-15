import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExamService } from 'src/app/Services/Exam/exam.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-exam-rank',
  templateUrl: './student-exam-rank.component.html',
  styleUrls: ['./student-exam-rank.component.css']
})
export class StudentExamRankComponent implements OnInit {
  rankData: any[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['rank', 'studentName', 'score'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private examData: ExamService,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.getCourseById();
  }

  getCourseById() {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);

    this.examData.getStudentsOrderedByScore().subscribe(rankData => {
      this.rankData = rankData.map((item: any, index: number) => ({ ...item, rank: index + 1 }));
      this.dataSource = new MatTableDataSource(this.rankData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
