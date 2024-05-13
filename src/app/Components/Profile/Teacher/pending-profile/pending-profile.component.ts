import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { TeacherService } from 'src/app/Services/Auth/teacher.service';

@Component({
  selector: 'app-pending-profile',
  templateUrl: './pending-profile.component.html',
  styleUrls: ['./pending-profile.component.css']
})
export class PendingProfileComponent {
  editText: boolean = true;
  errorReq: boolean = false;
  errorReq2: boolean = false;
  selectedImage: string | ArrayBuffer | null = 'https://bootdey.com/img/Content/avatar/avatar7.png';
  role: string = '';

  @ViewChild('uploadInput') uploadInput!: ElementRef<HTMLInputElement>;

  teacher: any;
  teacherHint: any = '';
  teacherData: any = '';
  constructor(private authService: AuthService,private teacherService: TeacherService,private snackBar: MatSnackBar,private router: Router) {
    this.role = this.authService.getUserRole();

  }

  ngOnInit(): void {
    // console.log('Teacher id:', this.authService.teacherId);
    // this.teacherHint = this.teacherService.getTeacherAbout()
  //  console.log(`hello ${this.teacherData}`)
   this.getTeacherById()
  }
  
  subjects: string[] = [
    'الرياضيات',
    'الفيزياء',
    'الكيمياء',
    'الأحياء',
    'اللغة الإنجليزية',
    'التاريخ',
    'الجغرافيا',
    'علوم الحاسوب',
    'اللغة العربية',
    'اللغة الفرنسية',
    'اللغة الإسبانية',
    'الفن',
    'الموسيقى',
    'التربية البدنية',
    'الدراسات الدينية'
];

  getTeacherById(): any {
     this.teacherService.getTeacherById(this.authService.getUserId()).subscribe(
      teacher => {
        this.teacherData=teacher;
        if (teacher.status === 'Approved') {
          this.closePage();
        }
      },
      (error) => {
        console.log(`err=> ${error}`)

        if (error.status === 404 || error.status === 403) {
          this.openSnackBar('غير متاح او لا يمكن الوصول', 'حسناً','');

          setTimeout(() => {
            window.history.back();
            window.history.replaceState(null, '', this.router.url);
          }, 2000);
        } else {
          console.error('Error fetching teacher data:', error);
        }
      });
  }

  saveupdate(updateData: string | null) {
    if (updateData) {
      const id = this.authService.getUserId();
      this.errorReq2 = false;
      const aboutTeacher = {
        aboutMe: updateData.toString(),
        //  accountNote: " "
      }

      this.teacherService.saveTeacherAbout(id, aboutTeacher).subscribe(
        (response) => {
          console.log('Update successful:', response);
        },
        (error) => {
          console.error('Update failed:', error);
        }
      );
    } else {
      this.errorReq2 = true;
      this.editText = !this.editText;
      console.error('Update data is null.');
    }
  }

  updateData(id: string, address: any, subject: any, number: any,about:any,experience:any,uploadInput:any) {
    console.log(`${address} and ${subject} and ${number} and ${about} and ${experience} and ${uploadInput}`);
    
    if (address && subject && number&&about&&experience) {
      const updatedTeachData = {
        phoneNumber: number,
        address: address,
        subject: subject,
        experience:experience,
        aboutMe:about
      };

      this.teacherService.updateTeacherProfile(id, updatedTeachData).subscribe({
        next: (data) => {
          console.log(data);

        },
        error:(err=>{
          this.openSnackBar(' تم تحديث البيانات ', 'حسنا','snackbar-success');
         this.reloadCurrentRoute()
          
        })
      });
      
      this.errorReq = false;
    } else {
      this.errorReq = true;
      this.editText = !this.editText;
      this.openSnackBar(' جميع الحقول مطلوبة', 'خطأ',"");
    }
  }

  toggleEdit() {
    this.editText = !this.editText;
  }

  previewImage(event: any,id:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result;
    };

    reader.readAsDataURL(file);
    console.log(`www=>${file}`)
  this.teacherService.uploadTeacherImage(id,file).subscribe({
    next:(data=>{
      console.log(data);
      this.reloadCurrentRoute()
    }),
    error:(err=>{
      console.log(err);
      if(err.status==200){
      this.reloadCurrentRoute()
      }
    })
  })


  }

  openFileInput() {
    this.uploadInput.nativeElement.click();
    console.log()
  }

  openSnackBar(message: string, action: string,panelClass:string): void {
    this.snackBar.open(message, action,{
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass:panelClass
    });
  }

  closePage() {
    this.openSnackBar('غير متاح او لا يمكن الوصول', 'حسناً',"");

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
