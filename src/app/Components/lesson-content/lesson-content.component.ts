import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILecture } from 'src/app/Model/icourse';
import { LecturesService } from 'src/app/Services/Lectures/lectures.service';

@Component({
  selector: 'app-lesson-content',
  templateUrl: './lesson-content.component.html',
  styleUrls: ['./lesson-content.component.css']
})
export class LessonContentComponent implements OnInit {
  lecture!: ILecture;
  courseId!: number;
  contentIndex: number = 0;
  panelOpenState = false;
  selected?: boolean;

  videoOptions: { label: string; selected: boolean; videoUrl: string; }[] = [];
  fileOptions: { label: string; pdfUrl: string; }[] = [];
  selectedVideoUrl: string = '';

  constructor(private route: ActivatedRoute, private lectureService: LecturesService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.courseId = params['courseId'];
      const lectureId = params['lectureId'];

      // Call getLectureById method to fetch the lecture
      this.lectureService.getLectureById(this.courseId, lectureId).subscribe(lecture => {
        this.lecture = lecture;
        this.initOptions();
      });
    });

  }

  initOptions() {
    if (this.lecture) {
      if (this.lecture.videos) {
        this.lecture.videos.forEach((video: any, index: number) => {
          const isSelected = index === 0;
          this.videoOptions.push({ label: video.videoTitle, selected: isSelected, videoUrl: video.videoPath });
          if (isSelected) {
            this.selectedVideoUrl = video.videoPath;
          }
        });
      }

      if (this.lecture.attachments) {
        console.log(this.lecture)
        this.lecture.attachments.forEach((attachments: any) => {
          this.fileOptions.push({ label: attachments.attachmentTitle, pdfUrl: attachments.attachmentPath });
        });
      }
    }
  }

  toggleOption(index: number) {
    this.videoOptions.forEach((videoOption, i) => {
      videoOption.selected = i === index;
    });
    this.selectedVideoUrl = this.videoOptions[index].videoUrl;
  }
}
