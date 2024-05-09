import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerChoices, IExamResult } from 'src/app/Model/iexam-result';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ExamService } from 'src/app/Services/Exam/exam.service';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css']
})
export class ExamResultComponent implements OnInit {
  result!: IExamResult;
  examId!: number;

  constructor(private examData: ExamService, private route: ActivatedRoute, private studentData: AuthService ,private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.examId = params['examId'];
      this.getExamResult(this.examId);
    });
  }

  getExamResult(examId: number) {
    this.examData.getSubmissionExam(examId, this.studentData.getUserId()).subscribe(result => {
      this.result = result;
      console.log(this.result);
    });
  }

  getAnswerChoices(answerChoices: AnswerChoices[]): string[] {
    return answerChoices.map(choice => choice.answerHeader);
  }

  getStudentAnswers(studentAnswerIds: number[], answerChoices: AnswerChoices[]): string {
    const selectedAnswers: string[] = [];

    for (const studentAnswerId of studentAnswerIds) {
      const choices = answerChoices.filter(choice => choice.answerId === studentAnswerId);

      if (choices.length > 0) {
        for (const choice of choices) {
          selectedAnswers.push(choice.answerHeader);
        }
      } else {
        selectedAnswers.push(`No answer found for ID ${studentAnswerId}`);
      }
    }

    return selectedAnswers.join(', ');
  }

  getCorrectAnswers(correctAnswerIds: number[], answerChoices: AnswerChoices[]): string {
    const correctAnswers: string[] = [];

    for (const correctAnswerId of correctAnswerIds) {
      const choices = answerChoices.filter(choice => choice.answerId === correctAnswerId);

      if (choices.length > 0) {
        for (const choice of choices) {
          correctAnswers.push(choice.answerHeader);
        }
      } else {
        correctAnswers.push(`No answer found for ID ${correctAnswerId}`);
      }
    }

    return correctAnswers.join(', ');
  }

  parseIds(ids: (string | number)[]): number[] {
    return ids.map(id => typeof id === 'string' ? parseInt(id, 10) : id);
  }

  isAnswerCorrect(studentAnswerIds: number[], correctAnswerIds: number[]): boolean {
    return JSON.stringify(studentAnswerIds.sort()) === JSON.stringify(correctAnswerIds.sort());
  }

  isCorrectChoice(choice: string, correctAnswerIds: number[]): boolean {
    return correctAnswerIds.includes(parseInt(choice, 10));
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
