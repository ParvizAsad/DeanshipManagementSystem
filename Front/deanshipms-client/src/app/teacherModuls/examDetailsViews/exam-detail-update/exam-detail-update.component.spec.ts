import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDetailUpdateComponent } from './exam-detail-update.component';

describe('ExamDetailUpdateComponent', () => {
  let component: ExamDetailUpdateComponent;
  let fixture: ComponentFixture<ExamDetailUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamDetailUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamDetailUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
