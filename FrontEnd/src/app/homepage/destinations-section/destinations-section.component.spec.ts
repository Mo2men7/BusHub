import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationsSectionComponent } from './destinations-section.component';

describe('DestinationsSectionComponent', () => {
  let component: DestinationsSectionComponent;
  let fixture: ComponentFixture<DestinationsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationsSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DestinationsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
