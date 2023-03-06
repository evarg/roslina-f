import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducersAddComponent } from './producers-add.component';

describe('ProducersAddComponent', () => {
  let component: ProducersAddComponent;
  let fixture: ComponentFixture<ProducersAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducersAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
