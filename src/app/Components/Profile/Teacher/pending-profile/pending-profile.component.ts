import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { TeacherService } from 'src/app/Services/Auth/teacher.service';

@Component({
  selector: 'app-pending-profile',
  templateUrl: './pending-profile.component.html',
  styleUrls: ['./pending-profile.component.css']
})
export class PendingProfileComponent {
  editText: boolean = true;

  selectedImage: string | ArrayBuffer | null = 'https://bootdey.com/img/Content/avatar/avatar7.png';

  @ViewChild('uploadInput') uploadInput!: ElementRef<HTMLInputElement>;

  teacher: any;
  teacherHint: any = '';
  constructor(private route: ActivatedRoute, private authService: AuthService, private teacherService: TeacherService) { }

  ngOnInit(): void {
    console.log('Teacher id:', this.authService.teacherId);
    this.teacherHint = this.teacherService.getTeacherAbout()
  }

  saveUpdate(updateData: string | null) {
    if (updateData !== null) {
      const id = this.authService.teacherId;
      const aboutTeacher = updateData.toString();
      this.teacherService.saveTeacherAbout(id, aboutTeacher).subscribe(
        (response) => {
          console.log('Update successful:', response);
        },
        (error) => {
          console.error('Update failed:', error);
        }
      );
    } else {
      console.error('Update data is null.');
    }
  }

  toggleEdit() {
    this.editText = !this.editText;
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
  }
}
