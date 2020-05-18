import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeventpageComponent } from './listeventpage.component';

describe('ListeventpageComponent', () => {
  let component: ListeventpageComponent;
  let fixture: ComponentFixture<ListeventpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeventpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeventpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
