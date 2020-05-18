import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPublicityComponent } from './list-publicity.component';

describe('ListPublicityComponent', () => {
  let component: ListPublicityComponent;
  let fixture: ComponentFixture<ListPublicityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPublicityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPublicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
