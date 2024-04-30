import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodetoresetpassComponent } from './codetoresetpass.component';

describe('CodetoresetpassComponent', () => {
  let component: CodetoresetpassComponent;
  let fixture: ComponentFixture<CodetoresetpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodetoresetpassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodetoresetpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
