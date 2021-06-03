import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tablerov2Component } from './tablerov2.component';

describe('Tablerov2Component', () => {
  let component: Tablerov2Component;
  let fixture: ComponentFixture<Tablerov2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tablerov2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tablerov2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
