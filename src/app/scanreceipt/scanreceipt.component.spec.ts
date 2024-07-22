import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanreceiptComponent } from './scanreceipt.component';

describe('ScanreceiptComponent', () => {
  let component: ScanreceiptComponent;
  let fixture: ComponentFixture<ScanreceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanreceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScanreceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
