import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSettingsFormComponent } from './student-settings-form.component';

describe('StudentSettingsFormComponent', () => {
  let component: StudentSettingsFormComponent;
  let fixture: ComponentFixture<StudentSettingsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentSettingsFormComponent]
    });
    fixture = TestBed.createComponent(StudentSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
