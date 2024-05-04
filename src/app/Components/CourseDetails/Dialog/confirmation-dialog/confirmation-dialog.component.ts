import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICourse } from 'src/app/Model/icourse';
import { AttachmentsService } from 'src/app/Services/Attachments/attachments.service';
import { LecturesService } from 'src/app/Services/Lectures/lectures.service';
import { VideosService } from 'src/app/Services/Videos/videos.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private lectureData: LecturesService,
    private attachmentData: AttachmentsService,
    private videoData: VideosService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
    if (this.data.contentId) {
      this.deleteContent(this.data.lectureId, this.data.contentId, this.data.contentType);
    } else {
      this.deleteLecture(this.data.lectureId);
    }
  }

  deleteLecture(lectureId: number): void {
    const courseId = this.data.courseId;
    console.log(lectureId)
    this.lectureData.deleteLectureById(courseId, lectureId).subscribe(
      () => {
        console.log(`Lesson with ID ${lectureId} and its content deleted successfully`);
        this.dialogRef.close(true);
        window.location.reload();
      },
      (error) => {
        console.error(`Failed to delete lesson with ID ${lectureId} and its content:`, error);
        this.dialogRef.close(false);
      }
    );
  }

  deleteContent(lectureId: number, contentId: number, contentType: string): void {
    const courseId = this.data.courseId;
    const methodToDelete = contentType === 'video' ? this.videoData.deleteVideoById : this.attachmentData.deleteAttachmentById;

    methodToDelete.call(this.videoData || this.attachmentData, courseId, lectureId, contentId).subscribe(
      () => {
        console.log(`Lesson content with ID ${contentId} removed successfully`);
        this.dialogRef.close(true);
        window.location.reload();
      },
      (error) => {
        console.error(`Failed to remove lesson content with ID ${contentId}:`, error);
        this.dialogRef.close(false);
      }
    );
  }
}
