import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateUserProfileComponent } from './private-user-profile.component';

describe('PrivateUserProfileComponent', () => {
  let component: PrivateUserProfileComponent;
  let fixture: ComponentFixture<PrivateUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateUserProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
