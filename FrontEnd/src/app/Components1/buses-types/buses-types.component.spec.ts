import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusesTypesComponent } from './buses-types.component';

describe('BusesTypesComponent', () => {
  let component: BusesTypesComponent;
  let fixture: ComponentFixture<BusesTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusesTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
