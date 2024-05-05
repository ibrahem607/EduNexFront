import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { TeacherService } from 'src/app/Services/Auth/teacher.service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent {
  edittext: boolean = true;
  edittext1: boolean = true;
  edittext2: boolean = true;
  errorReq:boolean=false;
  errorReq2:boolean=false;

  selectedImage: string | ArrayBuffer | null = 'https://bootdey.com/img/Content/avatar/avatar7.png';

  @ViewChild('uploadInput') uploadInput!: ElementRef<HTMLInputElement>;
  teacher: any;
  teacherHint: any = '';
  teacherData: any = '';
  constructor(private route: ActivatedRoute, private authService: AuthService, private teacherService: TeacherService) { }

  ngOnInit(): void {
    // console.log('Teacher id:', this.authService.teacherId);
    // this.teacherHint = this.teacherService.getTeacherAbout()

    this.getTeacherById()


  }

  getTeacherById():any
  {
    this.teacherData=this.teacherService.getTeacherById(this.authService.getUserId()).subscribe({
      next:(data:any)=>{
        this.teacherData=data;
        // console.log(`teacher data ${this.teacherData.firstName}`);
      },
      error:(err)=>{
        // console.log(`error yaman${err.error}`)
      }
    })
  }

  saveupdate(updateData: string | null) {
    if (updateData) {
      const id = this.authService.getUserId();
     this.errorReq2=false;
      const aboutTeacher ={
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
      this.errorReq2=true;
      this.edittext = !this.edittext;
      console.error('Update data is null.');
    }
  }

  updateData(id: string, address: any, subject: any, number: any) {
    if (address && subject && number) {
        console.log(`${address} and ${subject} and ${number}`);

        const updatedTeachData = {
            phoneNumber: number,
            address: address,
            subject: subject
        };

        this.teacherService.updateTeacherProfile(id, updatedTeachData).subscribe({
            next: (data) => {
                console.log(data);
            }
        });
        this.errorReq = false;
    } else {
        this.errorReq = true;
        this.edittext1 = !this.edittext1;
    }
}



  toggleEdit() {
    this.edittext = !this.edittext;
    console.log(this.teacherData.aboutMe)
    
  }

  toggleEdit2() {
    this.edittext2 = !this.edittext2;
  }

  toggleEditp() {
    this.edittext1 = !this.edittext1;
  }

  previewImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.selectedImage = reader.result;
    };

    reader.readAsDataURL(file);
  }

  openFileInput() {
    this.uploadInput.nativeElement.click();
    console.log()
  }

}



