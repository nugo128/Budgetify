import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoneyToPiggyDialogComponent } from './add-money-to-piggy-dialog.component';

describe('AddMoneyToPiggyDialogComponent', () => {
  let component: AddMoneyToPiggyDialogComponent;
  let fixture: ComponentFixture<AddMoneyToPiggyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMoneyToPiggyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMoneyToPiggyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
