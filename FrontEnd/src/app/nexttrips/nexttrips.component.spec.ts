import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NexttripsComponent } from './nexttrips.component';

describe('NexttripsComponent', () => {
  let component: NexttripsComponent;
  let fixture: ComponentFixture<NexttripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NexttripsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NexttripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
