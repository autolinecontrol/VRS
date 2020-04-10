import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarfirestoreComponent } from './buscarfirestore.component';

describe('BuscarfirestoreComponent', () => {
  let component: BuscarfirestoreComponent;
  let fixture: ComponentFixture<BuscarfirestoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarfirestoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarfirestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
