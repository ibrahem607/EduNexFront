import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamRankComponent } from './student-exam-rank.component';

describe('StudentExamRankComponent', () => {
  let component: StudentExamRankComponent;
  let fixture: ComponentFixture<StudentExamRankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentExamRankComponent]
    });
    fixture = TestBed.createComponent(StudentExamRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
