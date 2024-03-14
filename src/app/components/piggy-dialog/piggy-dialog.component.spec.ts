import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiggyDialogComponent } from './piggy-dialog.component';

describe('PiggyDialogComponent', () => {
  let component: PiggyDialogComponent;
  let fixture: ComponentFixture<PiggyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PiggyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PiggyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
