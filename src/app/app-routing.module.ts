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
import { TeacherProfileComponent } from './Components/Profile/Teacher/teacher-profile/teacher-profile.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { StudentSignUpPageComponent } from './Components/SignUp/Student/student-sign-up-page/student-sign-up-page.component';
import { TeacherSignUpPageComponent } from './Components/SignUp/Teacher/teacher-sign-up-page/teacher-sign-up-page.component';
import { PendingProfileComponent } from './Components/Profile/Teacher/pending-profile/pending-profile.component';
import { EditExamComponent } from './Components/Exam/Teacher/edit-exam/edit-exam.component';
import { AddEditCourseComponent } from './Components/Profile/Teacher/add-edit-course/add-edit-course.component';
import { LectureComponent } from './Components/lecture/lecture.component';
import { ParentsComponent } from './Components/parents/parents.component';
import { AboutPlatformComponent } from './Components/about-platform/about-platform.component';
import { StudentExamRankComponent } from './Components/student-exam-rank/student-exam-rank.component';

const routes: Routes = [
  { path: "home", component: MainComponent, data: { title: 'EduNex' } },
  { path: "", component: MainComponent, data: { title: 'EduNex' } },
  { path: "teacherSignup", component: TeacherSignUpPageComponent, data: { title: 'Teacher Signup' } },
  { path: "course/:courseId/lesson/:lessonId/create", component: EditExamComponent, data: { title: 'Exam' } },
  { path: "course/:courseId/lesson/:lessonId/view", component: StudentExamComponent, data: { title: 'Exam' } },
  { path: "course/:courseId/lesson/:lessonId/result", component: ExamResultComponent, data: { title: 'Result' } },
  { path: "student/profile/:id", component: StudentProfileComponent, data: { title: 'Student Profile' } },
  { path: "teacher/profile/:id", component: TeacherProfileComponent, data: { title: 'Teacher Profile' } },
  { path: "teacher/pending/:id", component: PendingProfileComponent, data: { title: 'Pending Profile' } },
  { path: "signup", component: StudentSignUpPageComponent, data: { title: 'Student Signup' } },
  { path: "courses", component: CoursesComponent, data: { title: 'Courses' } },
  { path: "course/:id", component: CourseDetailsComponent, data: { title: 'Course Details' } },
  { path: "lesson/:id", component: LectureComponent, data: { title: 'Lecture' } },
  { path: "teachers", component: TeachersComponent, data: { title: 'Teachers' } },
  { path: "teacher/:id", component: TeacherDetailsComponent, data: { title: 'Teacher Details' } },
  { path: "parents", component: ParentsComponent, data: { title: 'Parents' } },
  { path: "about", component: AboutPlatformComponent, data: { title: 'About us' } },
  { path: "rank", component: StudentExamRankComponent, data: { title: 'Students Rank' } },
  { path: "login", component: LoginComponent, data: { title: 'Login' } },
  { path: "notfound", component: NotFoundComponent, data: { title: 'Not Found' } },
  { path: "**", redirectTo: "notfound", data: { title: 'Not Found' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
