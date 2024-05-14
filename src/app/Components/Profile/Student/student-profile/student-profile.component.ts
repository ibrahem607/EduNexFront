import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignOutComponent } from '../../../sign-out/sign-out.component';
import { trigger, style, transition, animate } from '@angular/animations';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-200%)' }),
        animate('300ms', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
    ])
  ]
})
export class StudentProfileComponent implements OnInit {
  activeSection: string = '';
  selectedOptionIndex: number = 0;
  leavingAnimationInProgress: boolean = false;
  student!: any;

  options = [
    { label: 'الرئيسية', icon: 'home', selected: true },
    { label: 'الكورسات', icon: 'book', selected: false },
    { label: 'تفاصيل الميزانية', icon: 'wallet', selected: false },
    { label: 'الشحن', icon: 'credit-card', selected: false },
    { label: 'تغيير كلمة السر', icon: 'key', selected: false },
    { label: 'تسجيل الخروج', icon: 'sign-out-alt', selected: false }
  ];

  constructor(private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    const storedIndex = localStorage.getItem('studentSelectedOptionIndex');
    if (storedIndex !== null) {
      this.selectedOptionIndex = parseInt(storedIndex, 10);
    }

    this.getStudentData(this.authService.getUserId());
  }

  getStudentData(studentId: string) {
    this.authService.getStudentData(studentId).subscribe(student => {
      this.student = student;
      console.log(student);
    });
  }

  setActiveSection(index: number): void {
    if (index === 5) {
      this.openSignOutDialog();
      this.selectedOptionIndex = -1;
    } else {
      this.options.forEach((option, i) => {
        option.selected = i === index;
      });
      this.activeSection = this.options[index].label;
      this.selectedOptionIndex = index;

      localStorage.setItem('studentSelectedOptionIndex', String(index));
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

  logOut(): any {
    this.authService.removeToken();
    this.authService.removeUserId();
    this.authService.removeUserRole();
    this.authService.logOut();
  }
}
