import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditObligatoryDialogComponent } from './edit-obligatory-dialog.component';

describe('EditObligatoryDialogComponent', () => {
  let component: EditObligatoryDialogComponent;
  let fixture: ComponentFixture<EditObligatoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditObligatoryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditObligatoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
