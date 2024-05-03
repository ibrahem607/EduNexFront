import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ILecture } from 'src/app/Model/icourse';
import { IExam, IQuestion } from 'src/app/Model/iexam';
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
  examId!: number;
  exam!: IExam;
  questions!: IQuestion[];
  selectedQuestionIndex: number = 0;
  visitedQuestions: boolean[] = [];
  form: FormGroup;
  skippedQuestions: boolean[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private examData: ExamService,
    private lectureData: LecturesService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.lectureId = params['lessonId'];
    });

    this.examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'))

    this.visitedQuestions[0] = true;

    this.getLectureById(this.lectureId);
    this.getExamById(this.examId);
    this.startExam(this.examId);
  }

  getExamById(id: number) {
    this.examData.getExamById(id).subscribe(exam => {
      this.exam = exam;
      this.questions = exam.questions;
      this.buildFormControls();
      // console.log(exam)
    });
  }

  getLectureById(id: number) {
    this.lectureData.getLectureById(this.courseId, id).subscribe(lecture => {
      this.lecture = lecture;
    });
  }

  startExam(id: number) {
    const student = {
      studentId: "4a653d27-1fa9-4820-9b60-1d54cf78ce76"
    }

    this.examData.startExam(id, student).subscribe(
      () => {
        console.log(`Exam : ${id} started successfully`);
      },
      (error) => {
        console.error('Error occurred while starting exam:', error);
      }
    );
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

  formattedExam() {
    const formattedExam: any = {
      studentId: "4a653d27-1fa9-4820-9b60-1d54cf78ce76",
      answers: []
    };

    this.exam.questions.forEach((question, i) => {
      const questionId = i;
      const selectedAnswersIds: number[] = [];

      const questionFormGroup = this.form.get('question_' + i) as FormGroup;

      if (questionFormGroup) {
        // Loop through each control in the form group
        Object.keys(questionFormGroup.controls).forEach(key => {
          const control = questionFormGroup.get(key);
          console.log("Key:", key);
          console.log("Control Value:", control?.value);
          // If the control is checked/selected, add its index to the selectedAnswersIds array
          if (control?.value) {
            // Extract the index of the answer from the control's key
            const answerIndex = parseInt(key.split('_').pop() || '0');
            console.log("Answer Index:", answerIndex);
            // Get the answer corresponding to the index
            const answer = question.answers[answerIndex];
            console.log("Answer:", answer);
            // Add the ID of the selected answer to the selectedAnswersIds array
            selectedAnswersIds.push(answer.answerId);
            console.log("Answer ID:", answer?.answerId);
          }
        });
      }

      formattedExam.answers.push({
        questionId: questionId,
        selectedAnswersIds: selectedAnswersIds
      });
    });
    console.log('Submitted Exam:', formattedExam);
    return formattedExam;
  }

  submitExam(examId: number) {
    const formattedExam = this.formattedExam();

    this.examData.submitExam(examId, formattedExam).subscribe(
      (response) => {
        console.log('Exam submitted successfully:', response);
        // Handle any further actions after successful submission, such as navigation or displaying a success message
      },
      (error) => {
        console.error('Error occurred while submitting exam:', error);
        // Handle errors, such as displaying an error message to the user
      }
    );

    const navigationExtras: NavigationExtras = {
      queryParams: { examId: examId },
      replaceUrl: true
    };
    this.router.navigate(['/course', this.courseId, 'lesson', this.lectureId, 'result'], navigationExtras);
  }
}
