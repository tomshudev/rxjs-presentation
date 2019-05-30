/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputObservavleSlideComponent } from './input-observavle-slide.component';

describe('InputObservavleSlideComponent', () => {
  let component: InputObservavleSlideComponent;
  let fixture: ComponentFixture<InputObservavleSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputObservavleSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputObservavleSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
