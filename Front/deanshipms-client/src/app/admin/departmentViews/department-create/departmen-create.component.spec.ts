import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmenCreateComponent } from './departmen-create.component';

describe('DepartmenCreateComponent', () => {
  let component: DepartmenCreateComponent;
  let fixture: ComponentFixture<DepartmenCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmenCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmenCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
