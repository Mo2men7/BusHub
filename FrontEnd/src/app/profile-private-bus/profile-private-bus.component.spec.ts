import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePrivateBusComponent } from './profile-private-bus.component';

describe('ProfilePrivateBusComponent', () => {
  let component: ProfilePrivateBusComponent;
  let fixture: ComponentFixture<ProfilePrivateBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePrivateBusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilePrivateBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
