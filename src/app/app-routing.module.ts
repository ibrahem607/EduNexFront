import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { TeachersComponent } from './Components/teachers/teachers.component';
import { MainComponent } from './Components/Home/main/main.component';
import { CourseDetailsComponent } from './Components/CourseDetails/course-details/course-details.component';

import { StudentExamComponent } from './Components/Exam/Student/student-exam/student-exam.component';
import { ExamResultComponent } from './Components/Exam/Student/exam-result/exam-result.component';
import { StudentProfileComponent } from './Components/Profile/Student/student-profile/student-profile.component';
import { TeacherDetailsComponent } from './Components/teacher-details/teacher-details.component';
// import { SignupTeacherComponent } from './Components/signup-teacher/signup-teacher.component';
// import { TeacherProfileComponent } from './Components/teacher-profile/teacher-profile.component';
import { AdminDashComponent } from './Components/admin-dash/admin-dash.component';
import { TeacherProfileComponent } from './Components/Profile/Teacher/teacher-profile/teacher-profile.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { StudentSignUpPageComponent } from './Components/SignUp/Student/student-sign-up-page/student-sign-up-page.component';
import { TeacherSignUpPageComponent } from './Components/SignUp/Teacher/teacher-sign-up-page/teacher-sign-up-page.component';
import { PendingProfileComponent } from './Components/Profile/Teacher/pending-profile/pending-profile.component';
import { EditExamComponent } from './Components/Exam/Teacher/edit-exam/edit-exam.component';
import { AddEditCourseComponent } from './Components/Profile/Teacher/add-edit-course/add-edit-course.component';
import { LectureComponent } from './Components/lecture/lecture.component';

const routes: Routes = [
  { path: "home", component: MainComponent },
  { path: "teacherSignup", component: TeacherSignUpPageComponent },
  { path: "course/:courseId/lesson/:lessonId/create", component: EditExamComponent },
  { path: "course/:courseId/lesson/:lessonId/view", component: StudentExamComponent },
  { path: "course/:courseId/lesson/:lessonId/result", component: ExamResultComponent },
  { path: "student/profile/:id", component: StudentProfileComponent },
  { path: "teacher/profile/:id", component: TeacherProfileComponent },
  { path: "teacher/pending/:id", component: PendingProfileComponent },
  { path: "crud/course", component: AddEditCourseComponent },
  { path: "signup", component: StudentSignUpPageComponent },
  { path: "courses", component: CoursesComponent },
  { path: "course/:id", component: CourseDetailsComponent },
  { path: "teachers", component: TeachersComponent },
  { path: "teacher/:id", component: TeacherDetailsComponent },
  { path: "lesson/:id", component: LectureComponent },
  { path: "adminDash", component: AdminDashComponent },
  { path: "home", component: MainComponent },
  { path: "error", component: MainComponent },
  { path: "lesson/:id", component: LectureComponent },
  { path: "login", component: LoginComponent },
  { path: "", component: LoginComponent },
  { path: "notfound", component: NotFoundComponent },
  { path: "**", redirectTo: "notfound" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
