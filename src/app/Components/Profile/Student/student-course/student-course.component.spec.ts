import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCourseComponent } from './student-course.component';

describe('ProfileCourseComponent', () => {
  let component: ProfileCourseComponent;
  let fixture: ComponentFixture<ProfileCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileCourseComponent]
    });
    fixture = TestBed.createComponent(ProfileCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
