import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRoomsPage } from './assign-rooms.page';

describe('AssignRoomsPage', () => {
  let component: AssignRoomsPage;
  let fixture: ComponentFixture<AssignRoomsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignRoomsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRoomsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
