import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { LoginComponent } from './Components/login/login.component';
import { HeaderComponent } from './Components/Shared/header/header.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { CustomPaginationComponent } from './Components/Shared/custom-pagination/custom-pagination.component';
import { TeachersComponent } from './Components/teachers/teachers.component';
import { MainComponent } from './Components/Home/main/main.component';
import { CourseCardComponent } from './Components/Shared/course-card/course-card.component';
import { TeacherCardComponent } from './Components/Shared/teacher-card/teacher-card.component';
import { RecentCoursesComponent } from './Components/Home/recent-courses/recent-courses.component';
import { AboutAcademyComponent } from './Components/Home/about-academy/about-academy.component';
import { AboutTeachersComponent } from './Components/Home/about-teachers/about-teachers.component';
import { SideScrollButtonsComponent } from './Components/Shared/side-scroll-buttons/side-scroll-buttons.component';
import { AboutUsComponent } from './Components/Home/about-us/about-us.component';
import { ClassRankComponent } from './Components/Home/class-rank/class-rank.component';
import { QuestionsComponent } from './Components/Home/questions/questions.component';
import { TargetCounterComponent } from './Components/Home/target-counter/target-counter.component';
import { AppearFromLeftDirective } from './Directive/appear-from-left.directive';
import { AppearFromRightDirective } from './Directive/appear-from-right.directive';
import { FooterComponent } from './Components/Shared/footer/footer.component';
import { ScrollToTopButtonComponent } from './Components/Shared/scroll-to-top-button/scroll-to-top-button.component';
import { CourseDetailsComponent } from './Components/CourseDetails/course-details/course-details.component';
import { CourseDetailsHeaderComponent } from './Components/CourseDetails/course-details-header/course-details-header.component';
import { CourseDetailsCardComponent } from './Components/CourseDetails/course-details-card/course-details-card.component';
import { SubscriptionDialogComponent } from './Components/CourseDetails/Dialog/subscription-dialog/subscription-dialog.component';
import { LessonDialogComponent } from './Components/CourseDetails/Dialog/lesson-dialog/lesson-dialog.component';
import { ContentDialogComponent } from './Components/CourseDetails/Dialog/content-dialog/content-dialog.component';
import { ConfirmationDialogComponent } from './Components/CourseDetails/Dialog/confirmation-dialog/confirmation-dialog.component';
import { HeroComponent } from './Components/Home/hero/hero.component';
import { CreateExamComponent } from './Components/Exam/Teacher/create-exam/create-exam.component';
import { ExamDialogComponent } from './Components/CourseDetails/Dialog/exam-dialog/exam-dialog.component';
import { QuestionControllerComponent } from './Components/Exam/Teacher/question-controller/question-controller.component';
import { ExamControllerComponent } from './Components/Exam/Teacher/exam-controller/exam-controller.component';
import { LessonContentComponent } from './Components/lesson-content/lesson-content.component';
import { StudentExamComponent } from './Components/Exam/Student/student-exam/student-exam.component';
import { TimerComponent } from './Components/Exam/Student/timer/timer.component';
import { ExamResultComponent } from './Components/Exam/Student/exam-result/exam-result.component';
import { ExamTimeOutComponent } from './Components/Exam/Student/exam-time-out/exam-time-out.component';
import { StudentProfileComponent } from './Components/Profile/student-profile/student-profile.component';
import { ProfileHomeComponent } from './Components/Profile/profile-home/profile-home.component';
import { ProfileCourseComponent } from './Components/Profile/profile-course/profile-course.component';
import { ProfileBudgetComponent } from './Components/Profile/profile-budget/profile-budget.component';
import { StudentShippingCodesComponent } from './Components/Profile/student-shipping-codes/student-shipping-codes.component';
import { ChangePasswordComponent } from './Components/Profile/change-password/change-password.component';
import { StudentSettingsComponent } from './Components/Profile/student-settings/student-settings.component';
import { SignOutComponent } from './Components/Profile/sign-out/sign-out.component';
import { TeacherDetailsComponent } from './Components/teacher-details/teacher-details.component';

import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { OverlayContainer } from '@angular/cdk/overlay';
import { SignupTeacherComponent } from './Components/signup-teacher/signup-teacher.component';
import { TeacherProfileComponent } from './Components/teacher-profile/teacher-profile.component';
import { CustomCloudNavbarComponent } from './Components/Shared/custom-cloud-navbar/custom-cloud-navbar.component';
import { AdminDashComponent } from './Components/admin-dash/admin-dash.component';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    HeaderComponent,
    CoursesComponent,
    CustomPaginationComponent,
    TeachersComponent,
    MainComponent,
    CourseCardComponent,
    TeacherCardComponent,
    RecentCoursesComponent,
    AboutAcademyComponent,
    AboutTeachersComponent,
    SideScrollButtonsComponent,
    AboutUsComponent,
    ClassRankComponent,
    QuestionsComponent,
    TargetCounterComponent,
    AppearFromLeftDirective,
    AppearFromRightDirective,
    FooterComponent,
    ScrollToTopButtonComponent,
    CourseDetailsComponent,
    CourseDetailsHeaderComponent,
    CourseDetailsCardComponent,
    SubscriptionDialogComponent,
    LessonDialogComponent,
    ContentDialogComponent,
    ConfirmationDialogComponent,
    HeroComponent,
    CreateExamComponent,
    ExamDialogComponent,
    QuestionControllerComponent,
    ExamControllerComponent,
    LessonContentComponent,
    StudentExamComponent,
    TimerComponent,
    ExamResultComponent,
    ExamTimeOutComponent,
    StudentProfileComponent,
    ProfileHomeComponent,
    ProfileCourseComponent,
    ProfileBudgetComponent,
    StudentShippingCodesComponent,
    ChangePasswordComponent,
    StudentSettingsComponent,
    SignOutComponent,
    TeacherDetailsComponent,
    SignupTeacherComponent,
    TeacherProfileComponent,
    CustomCloudNavbarComponent,
    AdminDashComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatRadioModule,
    MatSliderModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatTableModule,
    AppRoutingModule,
    LoadingBarModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
  ],
  providers: [
    OverlayContainer,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
