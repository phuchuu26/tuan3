import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanktokenComponent } from './banktoken.component';

describe('BanktokenComponent', () => {
  let component: BanktokenComponent;
  let fixture: ComponentFixture<BanktokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanktokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanktokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
