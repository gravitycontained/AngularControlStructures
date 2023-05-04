import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KinosaalComponent } from './kinosaal.component';

describe('KinosaalComponent', () => {
  let component: KinosaalComponent;
  let fixture: ComponentFixture<KinosaalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KinosaalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KinosaalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
