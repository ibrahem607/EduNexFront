import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerChoices, IExamResult } from 'src/app/Model/iexam-result';
import { ExamService } from 'src/app/Services/Exam/exam.service';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css']
})
export class ExamResultComponent implements OnInit {
  result!: IExamResult;
  examId: number;

  constructor(private examData: ExamService, private route: ActivatedRoute) {
    this.examId = 0;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.examId = params['examId'];
      this.getExamResult(this.examId);
    });
  }

  getExamResult(examId: number) {
    this.examData.getExamResult(examId, "4a653d27-1fa9-4820-9b60-1d54cf78ce76").subscribe(result => {
      this.result = result;
      console.log(this.result);
    });
  }

  getAnswerChoices(answerChoices: AnswerChoices[]): string[] {
    return answerChoices.map(choice => choice.AnswerHeader);
  }

  getStudentAnswers(studentAnswerIds: number[], answerChoices: AnswerChoices[]): string {
    const selectedAnswers = studentAnswerIds.map(id => answerChoices[id - 1].AnswerHeader);
    return selectedAnswers.join(', ');
  }

  getCorrectAnswers(correctAnswerIds: number[], answerChoices: AnswerChoices[]): string {
    const correctAnswers = correctAnswerIds.map(id => answerChoices[id - 1].AnswerHeader);
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
}
