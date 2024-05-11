import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
  @Output() imageSelected = new EventEmitter<File>();
  @Output() imageDeleted = new EventEmitter<void>();
  @Input() thumbnail: string | null = null;

  editForm = this.fb.group({
    photo: [null, Validators.required]
  });

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    if (this.thumbnail) {
      this.editForm.get('photo')?.setValue(this.thumbnail);
    }
  }

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

  deleteImage(): void {
    this.editForm.get('photo')?.setValue(null);
    this.imageDeleted.emit();
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
