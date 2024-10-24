import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClientModalComponent } from './new-client-modal.component';

describe('NewClientModalComponent', () => {
  let component: NewClientModalComponent;
  let fixture: ComponentFixture<NewClientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewClientModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewClientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
