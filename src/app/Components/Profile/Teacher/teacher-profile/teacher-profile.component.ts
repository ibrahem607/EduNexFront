import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignOutComponent } from '../../../sign-out/sign-out.component';
import { trigger, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { TeachersService } from 'src/app/Services/Teachers/teachers.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-200%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
    ])
  ]
})
export class TeacherProfileComponent implements OnInit {
  activeSection: string = '';
  selectedOptionIndex: number = 0;
  leavingAnimationInProgress: boolean = false;
  teacher!: any;

  options = [
    { label: 'الرئيسية', icon: 'home', selected: true },
    { label: 'الكورسات', icon: 'book', selected: false },
    { label: 'تغيير كلمة السر', icon: 'key', selected: false },
    { label: 'تسجيل الخروج', icon: 'sign-out-alt', selected: false }
  ];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private teacherService: TeachersService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.getTeacherData(this.authService.getUserId());
  }

  ngOnInit() {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);

    const storedIndex = localStorage.getItem('teacherSelectedOptionIndex');
    if (storedIndex !== null) {
      this.selectedOptionIndex = parseInt(storedIndex, 10);
    }

    this.getTeacherData(this.authService.getUserId());
  }

  getTeacherData(teacherId: string) {
    this.teacherService.getTeacherById(teacherId).subscribe(teacher => {
      this.teacher = teacher;
      if (teacher.status !== "Approved") {
        this.closePage();
      }
    },
      error => {
        if (error.status === 404 || error.status === 403) {
          this.openSnackBar('غير متاح او لا يمكن الوصول', 'حسناً');

          setTimeout(() => {
            window.history.back();
            window.history.replaceState(null, '', this.router.url);
          }, 2000);
        } else {
          console.error('Error fetching teacher:', error);
        }
      });
  }

  setActiveSection(index: number): void {
    if (index === 3) {
      this.openSignOutDialog();
      this.selectedOptionIndex = -1;
    } else {
      this.options.forEach((option, i) => {
        option.selected = i === index;
      });
      this.activeSection = this.options[index].label;
      this.selectedOptionIndex = index;

      localStorage.setItem('teacherSelectedOptionIndex', String(index));
    }
  }

  openSignOutDialog(): void {
    const dialogRef = this.dialog.open(SignOutComponent, {
      data: {
        message: 'هل أنت متأكد أنك تريد تسجيل الخروج؟',
        confirmButtonText: 'تسجيل الخروج'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'logout') {
      }
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  closePage() {
    this.openSnackBar('غير متاح او لا يمكن الوصول', 'حسناً');

    this.goBackAndRemoveCurrentRoute();
  }

  goBackAndRemoveCurrentRoute(): void {
    const newUrl = `/teacher/pending/${this.authService.getUserId()}`;
    this.router.navigateByUrl(newUrl);
  }
}



