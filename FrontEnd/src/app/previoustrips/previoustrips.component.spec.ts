import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevioustripsComponent } from './previoustrips.component';

describe('PrevioustripsComponent', () => {
  let component: PrevioustripsComponent;
  let fixture: ComponentFixture<PrevioustripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrevioustripsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrevioustripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
