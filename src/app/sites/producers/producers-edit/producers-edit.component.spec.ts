import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducersEditComponent } from './producers-edit.component';

describe('ProducersEditComponent', () => {
  let component: ProducersEditComponent;
  let fixture: ComponentFixture<ProducersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducersEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
