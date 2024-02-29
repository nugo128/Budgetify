import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePiggyDialogComponent } from './delete-piggy-dialog.component';

describe('DeletePiggyDialogComponent', () => {
  let component: DeletePiggyDialogComponent;
  let fixture: ComponentFixture<DeletePiggyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletePiggyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletePiggyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
