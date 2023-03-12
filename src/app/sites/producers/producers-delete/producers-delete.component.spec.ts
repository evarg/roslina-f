import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducersDeleteComponent } from './producers-delete.component';

describe('ProducersDeleteComponent', () => {
  let component: ProducersDeleteComponent;
  let fixture: ComponentFixture<ProducersDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducersDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducersDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
