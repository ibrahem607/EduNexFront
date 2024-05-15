import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubject } from 'src/app/Model/icourse';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { TeacherService } from 'src/app/Services/Auth/teacher.service';
import { CoursesService } from 'src/app/Services/Courses/courses.service';

@Component({
  selector: 'app-pending-profile',
  templateUrl: './pending-profile.component.html',
  styleUrls: ['./pending-profile.component.css']
})
export class PendingProfileComponent implements OnInit {
  editText: boolean = true;
  errorReq: boolean = false;
  errorReq2: boolean = false;
  selectedImage: string | ArrayBuffer | null = 'https://bootdey.com/img/Content/avatar/avatar7.png';
  role: string = '';
  subjects!: ISubject[];
  pendingForm: FormGroup;

  @ViewChild('uploadInput') uploadInput!: ElementRef<HTMLInputElement>;

  teacherData: any = '';

  constructor(
    private authService: AuthService,
    private courseData: CoursesService,
    private teacherService: TeacherService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.role = this.authService.getUserRole();

    this.pendingForm = this.fb.group({
      subject: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^(010|015|011|012)\\d{8}$')]],
      address: ['', Validators.required],
      aboutMe: ['', Validators.required],
      experience: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    const pageTitle = this.route.snapshot.data['title'];
    this.titleService.setTitle(pageTitle);

    this.getTeacherById();
    this.getAllSubjects();
    this.pendingForm.disable();
  }

  initializeFormValues(): void {
    console.log(this.teacherData)
    if (this.teacherData) {
      this.pendingForm.patchValue({
        email: this.teacherData.email,
        phoneNumber: this.teacherData.phoneNumber,
        address: this.teacherData.address,
        aboutMe: this.teacherData.aboutMe,
        experience: this.teacherData.experience,
        subject: this.teacherData.subject
      });
    }
  }

  getAllSubjects(): void {
    this.courseData.getAllSubjects().subscribe(
      subjects => {
        this.subjects = subjects.map(subject => {
          return {
            id: subject.id,
            ...subject
          } as ISubject;
        });
      },
      error => {
        console.error('Error fetching subjects:', error);
      }
    );
  }

  getTeacherById(): void {
    this.teacherService.getTeacherById(this.authService.getUserId()).subscribe(
      teacher => {
        this.teacherData = teacher;
        if (teacher.status === 'Approved') {
          this.closePage();
          this.openSnackBar('غير متاح او لا يمكن الوصول', 'حسناً', '');
        }
        this.initializeFormValues();
      },
      (error) => {
        console.log(`err=> ${error}`);
        if (error.status === 404 || error.status === 403) {
          this.openSnackBar('غير متاح او لا يمكن الوصول', 'حسناً', '');

          setTimeout(() => {
            window.history.back();
            window.history.replaceState(null, '', this.router.url);
          }, 2000);
        } else {
          console.error('Error fetching teacher data:', error);
        }
      }
    );
  }

  updateData(id: string): void {
    const formValues = this.pendingForm.value;

    if (this.pendingForm.valid) {
      const updatedTeacherData = {
        phoneNumber: formValues.phoneNumber,
        address: formValues.address,
        subject: formValues.subject,
        experience: formValues.experience,
        aboutMe: formValues.aboutMe
      };

      this.teacherService.updateTeacherProfile(id, updatedTeacherData).subscribe({
        next: () => {
          this.openSnackBar('تم تحديث البيانات', 'حسنًا', 'snackbar-success');
          this.reloadCurrentRoute();
        },
        error: (error => {
          console.error('Error updating data:', error);
          if (error.status === 200) {
            this.openSnackBar('تم تحديث البيانات', 'حسنًا', 'snackbar-success');
            this.reloadCurrentRoute();
          } else {
            this.openSnackBar('حدث خطأ أثناء تحديث البيانات', 'حسنًا', 'snackbar-error');
          }
        })
      });
    } else {
      Object.keys(this.pendingForm.controls).forEach(controlName => {
        this.pendingForm.get(controlName)?.markAsTouched();
      });
    }
  }


  toggleEdit(): void {
    this.editText = !this.editText;
    if (!this.editText) {
      this.pendingForm.enable();
    } else {
      this.pendingForm.disable();
    }
  }

  previewImage(event: any, id: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result;
    };

    reader.readAsDataURL(file);
    // console.log(`www=>${file}`)
    this.teacherService.uploadTeacherImage(id, file).subscribe({
      next: (data => {
        // console.log(data);
        this.reloadCurrentRoute();
      }),
      error: (err => {
        console.log(err);
        if (err.status == 200) {
          this.reloadCurrentRoute();
        }
      })
    });
  }

  openFileInput(): void {
    this.uploadInput.nativeElement.click();
  }

  openSnackBar(message: string, action: string, panelClass: string): void {
    let verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    let horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    if (message === 'غير متاح او لا يمكن الوصول') {
      verticalPosition = 'top';
      horizontalPosition = 'center';
    }

    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: verticalPosition,
      horizontalPosition: horizontalPosition,
      panelClass: panelClass
    });
  }

  closePage(): void {
    this.openSnackBar('غير متاح او لا يمكن الوصول', 'حسناً', '');

    this.goBackAndRemoveCurrentRoute();
  }

  goBackAndRemoveCurrentRoute(): void {
    window.history.back();
    window.history.replaceState(null, '', this.router.url);
  }

  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
