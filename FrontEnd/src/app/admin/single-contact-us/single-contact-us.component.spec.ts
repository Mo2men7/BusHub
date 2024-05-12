import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleContactUsComponent } from './single-contact-us.component';

describe('SingleContactUsComponent', () => {
  let component: SingleContactUsComponent;
  let fixture: ComponentFixture<SingleContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleContactUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
