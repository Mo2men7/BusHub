import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsshowComponent } from './tripsshow.component';

describe('TripsshowComponent', () => {
  let component: TripsshowComponent;
  let fixture: ComponentFixture<TripsshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripsshowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripsshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
