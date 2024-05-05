import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBudgetComponent } from './profile-budget.component';

describe('ProfileBudgetComponent', () => {
  let component: ProfileBudgetComponent;
  let fixture: ComponentFixture<ProfileBudgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileBudgetComponent]
    });
    fixture = TestBed.createComponent(ProfileBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
