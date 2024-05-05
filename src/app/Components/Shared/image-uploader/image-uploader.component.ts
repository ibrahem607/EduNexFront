import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent {
  @Output() imageSelected = new EventEmitter<File>();

  editForm = this.fb.group({
    photo: []
  });

  constructor(private fb: UntypedFormBuilder) { }


  setFileData(event: Event): void {
    const eventTarget: HTMLInputElement | null = event.target as HTMLInputElement | null;
    if (eventTarget?.files?.[0]) {
      const file: File = eventTarget.files[0];
      this.imageSelected.emit(file);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.editForm.get('photo')?.setValue(reader.result as string);
      });
      reader.readAsDataURL(file);
    }
  }
}
