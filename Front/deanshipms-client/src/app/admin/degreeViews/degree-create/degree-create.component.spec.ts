import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeCreateComponent } from './degree-create.component';

describe('DegreeCreateComponent', () => {
  let component: DegreeCreateComponent;
  let fixture: ComponentFixture<DegreeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DegreeCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DegreeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
