import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProduceComponent } from './create-produce.component';

describe('CreateProduceComponent', () => {
  let component: CreateProduceComponent;
  let fixture: ComponentFixture<CreateProduceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProduceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
