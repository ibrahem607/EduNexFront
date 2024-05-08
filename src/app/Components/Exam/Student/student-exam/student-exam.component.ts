import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ILecture } from 'src/app/Model/icourse';
import { IExam, IQuestion } from 'src/app/Model/iexam';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ExamService } from 'src/app/Services/Exam/exam.service';
import { LecturesService } from 'src/app/Services/Lectures/lectures.service';

import { atLeastOneCheckboxChecked, atLeastOneRadioButtonChecked } from 'src/app/Validator/exam-validators';

@Component({
  selector: 'app-student-exam',
  templateUrl: './student-exam.component.html',
  styleUrls: ['./student-exam.component.css']
})
export class StudentExamComponent implements OnInit {
  courseId!: number;
  lectureId!: number;
  lecture!: ILecture;
  studentId!: string;
  examId!: number;
  exam!: IExam;
  questions!: IQuestion[];
  selectedQuestionIndex: number = 0;
  visitedQuestions: boolean[] = [];
  form: FormGroup;
  skippedQuestions: boolean[] = [];
  duration!: number;
  startData!: any;
  userId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private examData: ExamService,
    private lectureData: LecturesService,
    private studentData: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private userData: AuthService
  ) {
    this.form = this.fb.group({});
    this.userId = this.userData.getUserId();
  }

  ngOnInit(): void {
    this.studentId = this.studentData.getUserId();

    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      this.examId = +queryParams.get('examId')!;
      this.startExam(this.examId);
    });

    this.activatedRoute.params.subscribe(params => {
      this.courseId = +params['courseId'];
      this.lectureId = +params['lessonId'];
      this.getLectureById(this.lectureId);
    });

    this.visitedQuestions[0] = true;
  }

  startExam(id: number) {
    const student = {
      studentId: this.studentId
    }

    this.examData.startExam(id, student).subscribe(
      () => {
        console.log(`Exam : ${id} started successfully`);
        this.getExamById(this.examId);
      },
      (error) => {
        console.error('Error occurred while starting exam:', error);
      }
    );
  }

  getExamById(id: number) {
    this.examData.getExamById(id).subscribe(exam => {
      this.exam = exam;
      this.questions = exam.questions;
      this.buildFormControls();
      this.getStartData(this.examId, this.studentId);
    });
  }

  getStartData(id: number, student: any) {
    this.examData.getDurationExam(id, student).subscribe(startData => {
      this.startData = startData;
      console.log(startData)
      this.duration = this.exam.duration - this.durationCalculation();
    });
  }

  getLectureById(id: number) {
    this.lectureData.getLectureById(this.courseId, id, this.userId).subscribe(lecture => {
      this.lecture = lecture;
    });
  }

  durationCalculation() {
    const currentDateTime = new Date();
    const startDateTimeString = this.startData.startTime;

    const startDateTime = new Date(startDateTimeString);

    const timeDifferenceInMills = currentDateTime.getTime() - startDateTime.getTime();

    return Math.floor(timeDifferenceInMills / (1000 * 60));
  }

  buildFormControls() {
    const formControls: { [key: string]: any } = {};
    this.exam.questions.forEach((question, i) => {
      const questionControls: { [key: string]: any } = {};
      question.answers.forEach((answer, j) => {
        if (question.type === 'multipleChoice') {
          questionControls['answer_' + i + '_' + j] = new FormControl(false);
        } else {
          questionControls['answer_' + i] = new FormControl(null);
        }
      });
      formControls['question_' + i] = new FormGroup(questionControls);
      if (question.type === 'multipleChoice') {
        formControls['question_' + i].setValidators(atLeastOneCheckboxChecked());
      } else {
        formControls['question_' + i].setValidators(atLeastOneRadioButtonChecked());
      }
    });
    this.form = this.fb.group(formControls);
  }

  selectQuestion(index: number) {
    if (index === 0 || this.visitedQuestions[index]) {
      this.selectedQuestionIndex = index;
    }
  }

  navigateBack() {
    if (this.selectedQuestionIndex > 0) {
      this.selectedQuestionIndex--;
    }
  }

  skipQuestion() {
    this.visitedQuestions[this.selectedQuestionIndex + 1] = true;
    this.skippedQuestions[this.selectedQuestionIndex] = true;
    this.selectedQuestionIndex++;
  }

  updateQuestionButtonClasses(index: number, addClass: string, removeClass: string) {
    const buttons = document.querySelectorAll('.circle-button');
    buttons.forEach((button, i) => {
      if (i === index) {
        button.classList.add(addClass);
        button.classList.remove(removeClass);
      }
    });
  }

  navigateForward() {
    if (this.selectedQuestionIndex === this.exam.questions.length - 1) {
      this.submitExam(this.examId);
    }

    this.form.get('question_' + this.selectedQuestionIndex)?.markAllAsTouched();

    if (this.form.get('question_' + this.selectedQuestionIndex)?.invalid) {
      return;
    }

    this.visitedQuestions[this.selectedQuestionIndex] = true;

    if (!this.visitedQuestions[this.selectedQuestionIndex + 1] && !this.skippedQuestions[this.selectedQuestionIndex + 1]) {
      this.visitedQuestions[this.selectedQuestionIndex + 1] = true;
    }

    this.selectedQuestionIndex++;

    this.updateQuestionButtonClasses(this.selectedQuestionIndex - 1, 'solved', 'skipped');
  }

  getSelectedAnswersIdsAndIndex(questionId: number): number[] {
    const selectedAnswersIdsAndIndex: number[] = [];
    const question = this.exam.questions.find(q => q.id === questionId);

    if (question) {
      const formControls = this.form.controls;
      const controlKeys = Object.keys(formControls).filter(key => key.startsWith('question_'));

      controlKeys.forEach(key => {
        const questionIndex = parseInt(key.split('_')[1]);
        if (questionIndex !== -1 && questionIndex < this.exam.questions.length) {
          const questionFormGroup = formControls[key] as FormGroup;
          const answerControl = questionFormGroup.get('answer_' + questionIndex);
          if (answerControl && answerControl.value !== null) {
            const answerId = question.answers.find(answer => answer.header === answerControl.value)?.id;
            if (answerId !== undefined) {
              selectedAnswersIdsAndIndex.push(answerId, questionIndex);
            }
          }
        }
      });
    }

    return selectedAnswersIdsAndIndex;
  }

  compareSelectedAnswers(questionId: number): number[] {
    const selectedAnswersIdsAndIndex = this.getSelectedAnswersIdsAndIndex(questionId);

    // Extract the selected answer IDs from the array
    const selectedAnswersIds = selectedAnswersIdsAndIndex.filter((value, index) => index % 2 === 0);

    return selectedAnswersIds;
  }

  formattedExam() {
    const formattedExam: any = {
      studentId: this.studentId,
      answers: []
    };

    this.exam.questions.forEach(question => {
      const selectedAnswersIds = this.compareSelectedAnswers(question.id);
      formattedExam.answers.push({
        questionId: question.id,
        selectedAnswersIds: selectedAnswersIds
      });
    });

    // console.log('Submitted Exam:', formattedExam);
    return formattedExam;
  }

  submitExam(examId: number) {
    const formattedExam = this.formattedExam();

    // console.log(formattedExam);
    this.examData.submitExam(examId, formattedExam).subscribe(
      (response) => {
        console.log('Exam submitted successfully:', response);
      },
      (error) => {
        console.error('Error occurred while submitting exam:', error);
      }
    );

    const navigationExtras: NavigationExtras = {
      queryParams: { examId: examId },
      replaceUrl: true
    };
    this.router.navigate(['/course', this.courseId, 'lesson', this.lectureId, 'result'], navigationExtras);
  }
}
