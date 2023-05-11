import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontrollstrukturenComponent } from './kontrollstrukturen.component';

describe('KontrollstrukturenComponent', () => {
  let component: KontrollstrukturenComponent;
  let fixture: ComponentFixture<KontrollstrukturenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KontrollstrukturenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KontrollstrukturenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
