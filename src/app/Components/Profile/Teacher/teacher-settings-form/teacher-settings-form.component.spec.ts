import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSettingsFormComponent } from './teacher-settings-form.component';

describe('TeacherSettingsFormComponent', () => {
  let component: TeacherSettingsFormComponent;
  let fixture: ComponentFixture<TeacherSettingsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherSettingsFormComponent]
    });
    fixture = TestBed.createComponent(TeacherSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
