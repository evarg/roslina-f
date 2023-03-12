import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketsDeleteComponent } from './packets-delete.component';

describe('PacketsDeleteComponent', () => {
  let component: PacketsDeleteComponent;
  let fixture: ComponentFixture<PacketsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacketsDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacketsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
