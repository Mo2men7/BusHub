import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateBusPageComponent } from './private-bus-page.component';

describe('PrivateBusPageComponent', () => {
  let component: PrivateBusPageComponent;
  let fixture: ComponentFixture<PrivateBusPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivateBusPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivateBusPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
