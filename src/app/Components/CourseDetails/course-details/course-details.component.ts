import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IAttachment, ICourse, ILecture, IVideo } from 'src/app/Model/icourse';
import { LessonDialogComponent } from '../Dialog/lesson-dialog/lesson-dialog.component';
import { ContentDialogComponent } from '../Dialog/content-dialog/content-dialog.component';
import { ConfirmationDialogComponent } from '../Dialog/confirmation-dialog/confirmation-dialog.component';
import { ExamDialogComponent } from '../Dialog/exam-dialog/exam-dialog.component';
import { CoursesService } from 'src/app/Services/Courses/courses.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { ExamService } from 'src/app/Services/Exam/exam.service';
import { durationCalculation } from '../../Exam/Student/student-exam/student-exam.component';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  panelOpenState = false;
  course: ICourse | null = null;
  courseID: number = 0;
  showDetails: boolean = false;
  lectures: ILecture[] = [];
  lectureContact: { [key: number]: (IVideo | IAttachment)[] } = {};
  video!: IVideo;
  attachment!: IAttachment;
  role: string = '';

  options = [
    { label: 'محتوي الكورس', selected: true },
    { label: 'عن المعلم', selected: false },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseData: CoursesService,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.courseID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getCourseById();
    this.role = this.authService.getUserRole();
    // this.userId = this.authService.getUserId();
  }

  getCourseById() {
    this.courseData.getCourseById(this.courseID).subscribe(course => {
      this.course = course;
      console.log(course);
      if (this.course?.lectureList) {
        this.course.lectureList.forEach((lecture: ILecture) => {
          let lectureContents: (IVideo | IAttachment)[] = [];
          if (lecture.videos) {
            lectureContents.push(...lecture.videos);
          }
          if (lecture.attachments) {
            lectureContents.push(...lecture.attachments);
          }
          this.lectureContact[lecture.id] = lectureContents;
        });
      }
    });
  }

  toggleOption(index: number) {
    this.options.forEach((option, i) => {
      option.selected = i === index;
    });
    this.showDetails = !this.showDetails;
  }

  //add lesson
  openLessonDialog(): void {
    this.dialog.open(LessonDialogComponent, {
      width: '400px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        header: 'اضافه حصة',
        confirmButtonText: 'أضف الحصة',
        courseId: this.course?.id,
        name: this.course?.teacherName,
      }
    });
  }

  //edit lesson
  editLessonDialog(lectureId?: number, initialLectureTitle?: string, initialPrice?: number): void {
    this.dialog.open(LessonDialogComponent, {
      width: '400px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        header: 'تعديل الحصة',
        confirmButtonText: 'تعديل الأسم',
        courseId: this.course?.id,
        name: this.course?.teacherName,
        initialLectureId: lectureId,
        initialLectureTitle: initialLectureTitle,
        initialPrice: initialPrice,
      }
    });
  }

  //delete lesson
  openDeleteLectureConfirmationDialog(lectureId: number): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: 'هل أنت متأكد أنك تريد حذف الحصة؟',
        confirmButtonText: 'حذف الحصة',
        lectureId: lectureId,
        courseId: this.courseID,
        deleteType: "lecture"
      }
    });
  }

  //add content
  addContentDialog(contentType: string, lectureId: number): void {
    this.dialog.open(ContentDialogComponent, {
      width: '400px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        confirmButtonText: 'أضف الملفات',
        operation: 'add',
        courseId: this.course?.id,
        contentType: contentType,
        name: this.course?.teacherName,
        lectureId: lectureId,
      }
    });
  }

  //edit content
  editContentDialog(lectureId: number, lectureContact: IVideo | IAttachment): void {
    let contentType: string;
    let url: string | null = null;
    let contentTitle: string;

    if ('videoPath' in lectureContact) {
      contentType = 'video';
      url = (lectureContact as IVideo).videoPath;
      contentTitle = lectureContact.videoTitle;
    } else {
      contentType = 'file';
      url = (lectureContact as IAttachment).attachmentPath;
      contentTitle = lectureContact.attachmentTitle;
    }

    this.dialog.open(ContentDialogComponent, {
      width: '400px',
      panelClass: 'dialog-container',
      autoFocus: false,
      data: {
        confirmButtonText: 'تعديل الملفات',
        operation: 'edit',
        courseId: this.course?.id,
        name: this.course?.teacherName,
        lectureId: lectureId,
        content: lectureContact,
        contentId: lectureContact.id,
        contentType: contentType,
        contentTitle: contentTitle,
        url: url,
      }
    });
  }

  //delete content
  openDeleteContentConfirmationDialog(lectureId: number, content?: IVideo | IAttachment): void {
    let contentType: string | undefined;
    if (content) {
      contentType = 'videoPath' in content ? 'video' : 'file';
    }

    this.dialog.open(ConfirmationDialogComponent, {
      width: '600px',
      data: {
        message: 'هل أنت متأكد أنك تريد حذف هذا المحتوى؟',
        confirmButtonText: 'حذف المحتوى',
        lectureId: lectureId,
        contentId: content?.id,
        contentType: contentType,
        deleteType: "content"
      }
    });
  }

  //addExam / homeWork
  openExamDialog(examType: string, course: ICourse, lecture: ILecture, contentId: number): void {
    this.dialog.open(ExamDialogComponent, {
      width: '600px',
      data: {
        header: examType == 'PreExam' ? 'بيانات الامتحان' : 'بيانات الواجب',
        confirmButtonText: examType == 'PreExam' ? 'أضف الامتحان' : 'أضف الواجب',
        lectureId: lecture.id,
        lectureTitle: lecture.lectureTitle,
        contentId: contentId,
        courseID: course.id,
        courseTitle: course.courseName,
        grade: course.levelName,
        examType: examType,
      }
    });
  }

  passLesson(lecture: any): void {
    const queryParams = { courseId: this.course?.id, lectureId: lecture.id };

    this.router.navigate(['/lesson', lecture.id], { queryParams: queryParams });
  }

  getContentTitle(content: IVideo | IAttachment): string {
    if ('videoTitle' in content) {
      return (content as IVideo).videoTitle;
    } else {
      return (content as IAttachment).attachmentTitle;
    }
  }
}
