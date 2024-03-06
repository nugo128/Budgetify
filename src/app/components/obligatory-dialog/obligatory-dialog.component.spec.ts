import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObligatoryDialogComponent } from './obligatory-dialog.component';

describe('ObligatoryDialogComponent', () => {
  let component: ObligatoryDialogComponent;
  let fixture: ComponentFixture<ObligatoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObligatoryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObligatoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
