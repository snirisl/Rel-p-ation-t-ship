import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestsPage } from './add-requests.page';

describe('AddRequestsPage', () => {
  let component: AddRequestsPage;
  let fixture: ComponentFixture<AddRequestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRequestsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
