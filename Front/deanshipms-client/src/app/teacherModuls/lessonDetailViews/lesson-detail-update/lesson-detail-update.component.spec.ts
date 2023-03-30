import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonDetailUpdateComponent } from './lesson-detail-update.component';

describe('LessonDetailUpdateComponent', () => {
  let component: LessonDetailUpdateComponent;
  let fixture: ComponentFixture<LessonDetailUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonDetailUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonDetailUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
