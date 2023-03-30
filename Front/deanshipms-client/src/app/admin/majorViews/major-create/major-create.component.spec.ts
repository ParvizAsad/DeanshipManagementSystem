import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorCreateComponent } from './major-create.component';

describe('MajorCreateComponent', () => {
  let component: MajorCreateComponent;
  let fixture: ComponentFixture<MajorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MajorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
