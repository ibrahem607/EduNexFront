import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentShippingCodesComponent } from './student-shipping-codes.component';

describe('StudentShippingCodesComponent', () => {
  let component: StudentShippingCodesComponent;
  let fixture: ComponentFixture<StudentShippingCodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentShippingCodesComponent]
    });
    fixture = TestBed.createComponent(StudentShippingCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
