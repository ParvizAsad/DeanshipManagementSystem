import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositinCreateComponent } from './positin-create.component';

describe('PositinCreateComponent', () => {
  let component: PositinCreateComponent;
  let fixture: ComponentFixture<PositinCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositinCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositinCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
