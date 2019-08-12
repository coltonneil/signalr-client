import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionFinderComponent } from './connection-finder.component';

describe('ConnectionFinderComponent', () => {
  let component: ConnectionFinderComponent;
  let fixture: ComponentFixture<ConnectionFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
