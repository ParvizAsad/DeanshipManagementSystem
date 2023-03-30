import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDetailCreateComponent } from './exam-detail-create.component';

describe('ExamDetailCreateComponent', () => {
  let component: ExamDetailCreateComponent;
  let fixture: ComponentFixture<ExamDetailCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamDetailCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamDetailCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
