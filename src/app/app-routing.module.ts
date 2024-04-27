import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { TeachersComponent } from './Components/teachers/teachers.component';
import { MainComponent } from './Components/Home/main/main.component';
import { CourseDetailsComponent } from './Components/CourseDetails/course-details/course-details.component';

import { LessonContentComponent } from './Components/lesson-content/lesson-content.component';
import { StudentExamComponent } from './Components/Exam/Student/student-exam/student-exam.component';
import { ExamResultComponent } from './Components/Exam/Student/exam-result/exam-result.component';
import { StudentProfileComponent } from './Components/Profile/student-profile/student-profile.component';
import { TeacherDetailsComponent } from './Components/teacher-details/teacher-details.component';


import { TeacherDashboardComponent } from './Components/teacher-dashboard/teacher-dashboard.component';
import { SignupTeacherComponent } from './Components/signup-teacher/signup-teacher.component';
import { AdminDashBoardComponent } from './Components/admin-dash-board/admin-dash-board.component';
import { TeacherProfileComponent } from './Components/teacher-profile/teacher-profile.component';
import { CreateExamComponent } from './Components/Exam/Teacher/create-exam/create-exam.component';

const routes: Routes = [
  { path: "course/:courseId/lesson/:lessonId/create", component: CreateExamComponent },
  { path: "course/:courseId/lesson/:lessonId/view", component: StudentExamComponent },
  { path: "course/:courseId/lesson/:lessonId/result", component: ExamResultComponent },
  { path: "student/:studentId", component: StudentProfileComponent },
  { path: "course/:id/lesson/:id/exam/:id", component: CreateExamComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignUpComponent },
  { path: "courses", component: CoursesComponent },
  { path: "course/:id", component: CourseDetailsComponent },
  { path: "teachers", component: TeachersComponent },
  { path: "teacher/:id", component: TeacherDetailsComponent },
  { path: "lesson/:id", component: LessonContentComponent },
  { path: "home", component: MainComponent },
  { path: "error", component: MainComponent },
  { path: "home", component: MainComponent },
  { path: "tdash", component: TeacherDashboardComponent },
  { path: "home", component: MainComponent },
  { path: "teacherSignup", component: SignupTeacherComponent },
  { path: "teacherprofile", component: TeacherProfileComponent },
  { path: "admindash", component: AdminDashBoardComponent },
  { path: "", component: LoginComponent },
  { path: "**", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
