import { Component, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignOutComponent } from '../../sign-out/sign-out.component';
import { trigger, style, transition, animate } from '@angular/animations';
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
export class TeacherProfileComponent {
  activeSection: string = '';
  selectedOptionIndex: number = 0;
  leavingAnimationInProgress: boolean = false;

  options = [
    { label: 'الرئيسية', icon: 'home', selected: true },
    { label: 'الكورسات', icon: 'book', selected: false },
    { label: 'تغيير كلمة السر', icon: 'key', selected: false },
    { label: 'تسجيل الخروج', icon: 'sign-out-alt', selected: false }
  ];

  constructor(private dialog: MatDialog, private renderer: Renderer2) { }

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
}



