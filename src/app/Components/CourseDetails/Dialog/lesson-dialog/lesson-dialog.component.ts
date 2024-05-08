import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { LecturesService } from 'src/app/Services/Lectures/lectures.service';

@Component({
  selector: 'app-lesson-dialog',
  templateUrl: './lesson-dialog.component.html',
  styleUrls: ['./lesson-dialog.component.css']
})
export class LessonDialogComponent {
  lectureTitle!: string;
  price!: number;
  userId: string;

  constructor(
    public dialogRef: MatDialogRef<LessonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private lectureData: LecturesService,
    private userData: AuthService,
  ) {
    this.userId = this.userData.getUserId();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.lectureTitle);
    const courseId = this.data.courseId;
    const lectureId = this.data.initialLectureId;
    const price = this.data.initialPrice;

    if (this.data.initialLectureTitle) {
      // Edit existing lecture
      const updatedLecture: any = {
        id: lectureId,
        lectureTitle: this.lectureTitle,
        price: price,
        courseId: courseId
      };

      this.lectureData.editLecture(courseId, lectureId, updatedLecture, this.userId).subscribe(
        () => {
          console.log(`Lecture with ID ${lectureId} in course ${courseId} updated successfully.`);
          window.location.reload();
        },
        (error) => {
          console.error(`Failed to update lecture with ID ${lectureId} in course ${courseId}:`, error);
        }
      );
    } else {
      // Add new lecture
      const newLecture: any = {
        lectureTitle: this.lectureTitle,
        price: this.price,
        courseId: courseId
      };

      this.lectureData.addLecture(courseId, newLecture, this.userId).subscribe(
        () => {
          console.log(`New lecture added to course ${courseId} successfully.`);
          window.location.reload();
        },
        (error) => {
          console.error(`Failed to add new lecture to course ${courseId}:`, error);
        }
      );
    }
  }

}
