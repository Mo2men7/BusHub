import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituserdetailsComponent } from './edituserdetails.component';

describe('EdituserdetailsComponent', () => {
  let component: EdituserdetailsComponent;
  let fixture: ComponentFixture<EdituserdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdituserdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdituserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
