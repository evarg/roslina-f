import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducersViewComponent } from './producers-view.component';

describe('ProducersViewComponent', () => {
  let component: ProducersViewComponent;
  let fixture: ComponentFixture<ProducersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProducersViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
