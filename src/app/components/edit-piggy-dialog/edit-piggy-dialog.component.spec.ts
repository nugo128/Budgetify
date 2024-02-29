import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPiggyDialogComponent } from './edit-piggy-dialog.component';

describe('EditPiggyDialogComponent', () => {
  let component: EditPiggyDialogComponent;
  let fixture: ComponentFixture<EditPiggyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPiggyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPiggyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
