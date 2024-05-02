import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttachmentsService } from 'src/app/Services/Attachments/attachments.service';
import { VideosService } from 'src/app/Services/Videos/videos.service';

@Component({
  selector: 'app-content-dialog',
  templateUrl: './content-dialog.component.html',
  styleUrls: ['./content-dialog.component.css']
})
export class ContentDialogComponent {
  file: FileList | null = null;
  contentType: string = '';

  @ViewChild('videoInput') videoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('pdfInput') pdfInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<ContentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private attachmentData: AttachmentsService,
    private videoData: VideosService
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
    if (this.data.operation === 'edit') {
      this.editContent(this.data.lectureId, this.data.contentId);
    } else {
      this.addContent(this.data.lectureId);
    }
  }

  onFileSelected(event: any): void {
    this.file = event.target.files;
  }

  private editContent(lectureId: number, contentId: number): void {
    // Create a copy of the content to modify
    const updatedContent: any = {
      id: contentId,
      attachmentTitle: this.contentType
    };

    if (this.data.contentTitle === 'file') {
      this.attachmentData.editAttachment(this.data.courseId, lectureId, updatedContent, contentId).subscribe(
        () => {
          console.log(`Attachment with ID ${contentId} updated successfully`);
          window.location.reload();
        },
        (error) => {
          console.error(`Failed to update attachment with ID ${contentId}:`, error);
        }
      );
    } else if (this.data.contentTitle === 'video') {
      this.videoData.editVideo(this.data.courseId, lectureId, updatedContent, contentId).subscribe(
        () => {
          console.log(`Video with ID ${contentId} updated successfully`);
          window.location.reload();
        },
        (error) => {
          console.error(`Failed to update video with ID ${contentId}:`, error);
        }
      );
    } else {
      console.error(`Unsupported content type: ${this.data.contentTitle}`);
    }
  }

  private addContent(lectureId: number): void {
    if (!this.file) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('AttachmentTitle', this.contentType);
    formData.append('LectureId', lectureId.toString());

    if (this.data.contentTitle === 'file') {
      formData.append('File', this.file[0]);

      // Add the attachment using FormData
      this.attachmentData.addAttachment(this.data.courseId, lectureId, formData).subscribe(
        () => {
          console.log('New attachment added successfully');
          // window.location.reload();
        },
        (error) => {
          console.error('Failed to add new attachment:', error);
          // window.location.reload();
        }
      );
    } else if (this.data.contentTitle === 'video') {
      formData.append('videoPath', this.file[0]);

      // Add the video using FormData
      this.videoData.addVideo(this.data.courseId, lectureId, formData).subscribe(
        () => {
          console.log('New video added successfully');
          // window.location.reload();
        },
        (error) => {
          console.error('Failed to add new video:', error);
          // window.location.reload();
        }
      );
    } else {
      console.error(`Unsupported content type: ${this.data.contentTitle}`);
    }
  }


}
